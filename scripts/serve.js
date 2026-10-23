#!/usr/bin/env node
/**
 * scripts/serve.js — 零依赖本地静态服务器
 *
 * 把 dist/ 目录跑成一个本地静态网站，用于预览 ./scripts/build.sh 的产物。
 * 纯 Node 内置模块编写，Node 与 Bun 都能直接运行：
 *
 *   node scripts/serve.js              # http://127.0.0.1:8080
 *   bun  scripts/serve.js
 *   node scripts/serve.js dist --port 5173 --no-open
 *
 * 特性：MIME/charset、目录→index.html、clean URL（/a → /a.html）、目录列表、
 *       屏蔽 .git、ETag/Last-Modified → 304、Range → 206、HEAD、
 *       404（优先用站点自带的 404.html）、端口占用自动重试。
 */

'use strict';

const http = require('node:http');
const fs = require('node:fs');
const fsp = fs.promises;
const path = require('node:path');
const os = require('node:os');
const { spawn } = require('node:child_process');

/* ------------------------------------------------------------------ */
/* 配置 & 命令行参数                                                    */
/* ------------------------------------------------------------------ */

const DEFAULTS = {
  root: 'dist', // 默认相对仓库根目录（本文件在 scripts/ 下）
  host: '127.0.0.1',
  port: 8080,
  open: true,
  portRetry: 20, // 默认端口被占用时，最多向后试多少次
};

const REPO_ROOT = path.resolve(__dirname, '..');

const MIME = {
  html: 'text/html; charset=utf-8',
  htm: 'text/html; charset=utf-8',
  xml: 'text/xml; charset=utf-8',
  txt: 'text/plain; charset=utf-8',
  md: 'text/markdown; charset=utf-8',
  css: 'text/css; charset=utf-8',
  js: 'text/javascript; charset=utf-8',
  mjs: 'text/javascript; charset=utf-8',
  cjs: 'text/javascript; charset=utf-8',
  json: 'application/json; charset=utf-8',
  map: 'application/json; charset=utf-8',
  wasm: 'application/wasm',
  svg: 'image/svg+xml',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  avif: 'image/avif',
  ico: 'image/x-icon',
  bmp: 'image/bmp',
  tiff: 'image/tiff',
  mp4: 'video/mp4',
  webm: 'video/webm',
  mov: 'video/quicktime',
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  ogg: 'audio/ogg',
  m4a: 'audio/mp4',
  flac: 'audio/flac',
  pdf: 'application/pdf',
  zip: 'application/zip',
  gz: 'application/gzip',
  tgz: 'application/gzip',
  tar: 'application/x-tar',
  woff: 'font/woff',
  woff2: 'font/woff2',
  ttf: 'font/ttf',
  otf: 'font/otf',
  eot: 'application/vnd.ms-fontobject',
  csv: 'text/csv; charset=utf-8',
  vtt: 'text/vtt; charset=utf-8',
  manifest: 'application/manifest+json',
};

// 这些路径段既不出现在目录列表里，也不允许被请求
const BLOCKED = new Set(['.git', '.DS_Store', 'node_modules']);

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  usage();
  process.exit(0);
}

const ROOT = path.resolve(args.root);
const HOST = args.host;
let port = args.port;

/* ------------------------------------------------------------------ */
/* 启动                                                               */
/* ------------------------------------------------------------------ */

let statRoot;
try {
  statRoot = fs.statSync(ROOT);
} catch {
  fatal(
    `找不到站点目录：${rel(ROOT)}\n` +
      `  先执行 ./scripts/build.sh 生成产物，或用 "serve.js <目录>" 指定别的路径。`,
  );
}
if (!statRoot.isDirectory()) fatal(`站点目录不是一个目录：${rel(ROOT)}`);

let server = null;

/** 端口被占用时向后试几个，省去手改 --port */
async function start() {
  const highest = port + DEFAULTS.portRetry;
  for (let candidate = port; candidate <= highest; candidate++) {
    const result = await listen(candidate);
    if (result.ok) {
      port = candidate;
      banner();
      if (args.open && process.stdout.isTTY) openBrowser(url());
      return;
    }
    if (result.err.code === 'EACCES' || result.err.code === 'EPERM') {
      fatal(`没有权限监听 ${HOST}:${candidate}（EACCES/EPERM），换个端口或换监听地址。`);
    }
    if (result.err.code !== 'EADDRINUSE') fatal(result.err.message);
    console.warn(`  端口 ${candidate} 已被占用，尝试 ${candidate + 1}`);
  }
  fatal(`${port}~${highest} 这些端口都被占用了，用 --port 指定一个空闲端口。`);
}

/** 监听一次；成功/失败都只 resolve 一次，失败的 server 会被丢掉重建 */
function listen(listenPort) {
  return new Promise((resolve) => {
    const attempt = http.createServer(handler);
    const settle = (ok, err) => {
      attempt.off('error', onError);
      attempt.off('listening', onListening);
      resolve({ ok, err });
    };
    const onError = (err) => {
      if (attempt.listening) return; // 启动之后 socket 报错，与监听无关
      settle(false, err);
      attempt.close();
    };
    const onListening = () => {
      server = attempt;
      attempt.on('error', (err) => console.error(colorize('red', '  error ') + err.message));
      settle(true);
    };
    attempt.once('error', onError);
    attempt.once('listening', onListening);
    attempt.listen(listenPort, HOST);
  });
}

function banner() {
  console.log('');
  console.log(line(`本地静态服务器已启动 (${process.versions.bun ? 'bun ' + process.versions.bun : 'node ' + process.versions.node})`));
  console.log(`  根目录  ${ROOT}`);
  console.log(`  地址    ${colorize('cyan', url())}`);
  if (HOST === '0.0.0.0' || HOST === '::') {
    for (const ip of lanIPs()) console.log(`          ${colorize('cyan', `http://${ip}:${port}/`)}`);
  }
  console.log(`  提示    Ctrl+C 停止；重新 ./scripts/build.sh 后刷新即可看到新产物`);
  console.log('');
}

start().catch((err) => fatal(err.message));

for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => {
    console.log('\n  已停止。\n');
    if (!server || !server.listening) process.exit(0);
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 500).unref();
  });
}

/* ------------------------------------------------------------------ */
/* 请求处理                                                           */
/* ------------------------------------------------------------------ */

async function handler(req, res) {
  const started = Date.now();
  res.on('finish', () => log(req, res, Date.now() - started));

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return send(res, 405, 'text/plain; charset=utf-8', 'Method Not Allowed', {
      Allow: 'GET, HEAD',
    });
  }

  const found = await resolve(req.url);
  if (!found) return notFound(req, res);

  const { file, redirect, listing } = found;

  // 目录且没带结尾斜杠 → 302，保证页面里的相对路径正确
  if (redirect) {
    return send(res, 302, 'text/plain; charset=utf-8', `Redirecting to ${redirect}`, {
      Location: redirect,
      'Cache-Control': 'no-store',
    });
  }

  // 目录且没有 index.html → 生成目录列表
  if (listing) {
    const html = renderListing(listing.dir, listing.entries, toPathname(req.url) || '/');
    return send(res, 200, 'text/html; charset=utf-8', html, { 'Cache-Control': 'no-cache' });
  }

  let stat;
  try {
    stat = await fsp.stat(file);
  } catch {
    return notFound(req, res);
  }
  if (!stat.isFile()) return notFound(req, res);

  const etag = `W/"${stat.size.toString(16)}-${Math.floor(stat.mtimeMs).toString(16)}"`;
  const lastModified = stat.mtime.toUTCString();
  const cond = { ETag: etag, 'Last-Modified': lastModified };

  // 协商缓存
  const inm = req.headers['if-modified-since'];
  const ins = req.headers['if-none-match'];
  const notModified =
    (ins && ins.replace(/\s+/g, '').split(',').some((t) => t === etag || t === `W/${etag}` || t === etag.replace(/^W\//, ''))) ||
    (inm && Date.parse(inm) >= Math.floor(stat.mtimeMs / 1000) * 1000);
  if (notModified) {
    res.sentBytes = 0;
    res.writeHead(304, { 'Cache-Control': 'no-cache', ...cond });
    return res.end();
  }

  const type = MIME[extname(file)] || 'application/octet-stream';

  // Range → 206（音视频拖动、断点续传）
  const range = req.headers.range ? parseRange(req.headers.range, stat.size) : null;
  if (range && range.invalid) {
    return send(res, 416, 'text/plain; charset=utf-8', 'Range Not Satisfiable', {
      'Content-Range': `bytes */${stat.size}`,
      ...cond,
    });
  }

  const headers = {
    'Content-Type': type,
    'Cache-Control': 'no-cache', // 本地预览：每次都回源校验，改完刷新即见
    'Accept-Ranges': 'bytes',
    'X-Content-Type-Options': 'nosniff',
    ...cond,
  };

  res.sentBytes = range ? range.end - range.start + 1 : stat.size;
  if (range) {
    res.writeHead(206, {
      ...headers,
      'Content-Range': `bytes ${range.start}-${range.end}/${stat.size}`,
      'Content-Length': range.end - range.start + 1,
    });
  } else {
    res.writeHead(200, { ...headers, 'Content-Length': stat.size });
  }

  if (req.method === 'HEAD') return res.end();

  const stream = fs.createReadStream(file, range ? { start: range.start, end: range.end } : undefined);
  stream.on('error', () => res.destroy());
  stream.pipe(res);
}

/**
 * 把 URL 路径映射到磁盘上的文件。
 * 返回 { file } 可直读的文件；{ redirect } 需要跳转；{ listing } 需要目录列表。
 */
async function resolve(rawUrl) {
  const pathname = toPathname(rawUrl);
  if (pathname === null) return null; // 编码或字符非法

  const segments = pathname.split('/').filter(Boolean);
  if (segments.some((s) => s === '..' || BLOCKED.has(s)) || /\0/.test(pathname)) return null;

  const target = path.join(ROOT, ...segments);
  if (target !== ROOT && !target.startsWith(ROOT + path.sep)) return null; // 越界

  // 精确命中文件
  const st = await statOf(target);
  if (st && st.isFile()) return { file: target };

  if (st && st.isDirectory()) {
    const index = path.join(target, 'index.html');
    if (await isFile(index)) return { file: index };
    if (!pathname.endsWith('/')) {
      const query = rawUrl.includes('?') ? '?' + rawUrl.split('?')[1] : '';
      return { redirect: pathname + '/' + query };
    }
    const entries = await readDir(target);
    if (entries) return { listing: { dir: target, entries } };
  }

  // clean URL：/foo → /foo.html 或 /foo/index.html
  if (!path.extname(target)) {
    if (await isFile(target + '.html')) return { file: target + '.html' };
  }

  return null;
}

/**
 * 404 响应。
 * 站点根目录里有 404.html 就用它（和 GitHub Pages 的约定一致，状态码仍然是 404）；
 * 找不到该文件时退回下面的内置简版页面，保证 serve.js 服务任意目录都能用。
 */
async function notFound(req, res) {
  const custom = await customNotFoundPage();
  if (custom) {
    res.sentBytes = custom.length;
    res.writeHead(404, {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': custom.length,
      'Cache-Control': 'no-store', // 重新 build 之后马上能看到新版 404 页
      'X-Content-Type-Options': 'nosniff',
    });
    return req.method === 'HEAD' ? res.end() : res.end(custom);
  }

  const pathname = safePathname(req.url);
  const body =
    `<!doctype html><meta charset="utf-8"><title>404</title>` +
    `<style>body{font:16px/1.6 ui-monospace,SFMono-Regular,Menlo,monospace;margin:3rem auto;max-width:40rem;color:#333}` +
    `a{color:#0b6bcb}code{background:#f4f4f5;padding:.1rem .35rem;border-radius:.25rem}</style>` +
    `<h1>404 Not Found</h1><p><code>${esc(pathname)}</code> 不在 <code>${esc(rel(ROOT))}</code> 里。</p>` +
    `<p><a href="/">回到首页</a> · <a href="/version.html">查看构建版本</a> · 记得先 <code>./scripts/build.sh</code></p>`;
  return send(res, 404, 'text/html; charset=utf-8', body);
}

/** 读取 <root>/404.html；不存在、不是普通文件或体积超过 512KB 都视为没有 */
async function customNotFoundPage() {
  const file = path.join(ROOT, '404.html');
  const stat = await statOf(file);
  if (!stat || !stat.isFile() || stat.size > 512 * 1024) return null;
  try {
    return await fsp.readFile(file);
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* 工具函数                                                           */
/* ------------------------------------------------------------------ */

async function statOf(p) {
  try {
    return await fsp.stat(p);
  } catch {
    return null;
  }
}
async function isFile(p) {
  const s = await statOf(p);
  return !!(s && s.isFile());
}

async function readDir(dir) {
  try {
    const names = await fsp.readdir(dir);
    const entries = [];
    for (const name of names) {
      if (name.startsWith('.')) continue; // 列表里隐藏点文件
      if (BLOCKED.has(name)) continue;
      const s = await statOf(path.join(dir, name));
      entries.push({
        name,
        dir: !!(s && s.isDirectory()),
        size: s && s.isFile() ? s.size : null,
        mtime: s ? s.mtime : null,
      });
    }
    entries.sort((a, b) => (a.dir === b.dir ? a.name.localeCompare(b.name, 'zh-CN') : a.dir ? -1 : 1));
    return entries;
  } catch {
    return null;
  }
}

function renderListing(dir, entries, pathname) {
  const parent = pathname.split('/').filter(Boolean).slice(0, -1).join('/');
  const rows =
    (pathname !== '/' ? `<li><a href="/${parent ? parent + '/' : ''}">..</a></li>` : '') +
    entries
      .map((e) => {
        const href = encodeURIComponent(e.name) + (e.dir ? '/' : '');
        const meta = e.dir ? '-' : humanSize(e.size);
        const time = e.mtime ? e.mtime.toISOString().slice(0, 16).replace('T', ' ') : '';
        return `<li><a href="${href}">${esc(e.name)}${e.dir ? '/' : ''}</a><span>${esc(meta)}</span><span>${esc(time)}</span></li>`;
      })
      .join('');
  return (
    `<!doctype html><meta charset="utf-8"><title>Index of ${esc(pathname)}</title>` +
    `<style>body{font:14px/1.7 ui-monospace,SFMono-Regular,Menlo,monospace;margin:2.5rem auto;max-width:56rem;color:#333}` +
    `h1{font-size:1.05rem;font-weight:600;color:#666}ul{list-style:none;padding:0}` +
    `li{display:grid;grid-template-columns:1fr 6rem 10rem;gap:1rem;padding:.1rem 0;border-bottom:1px solid #f4f4f5}` +
    `li span{color:#999;text-align:right}a{color:#0b6bcb;text-decoration:none}a:hover{text-decoration:underline}</style>` +
    `<h1>Index of ${esc(pathname)} <small>(${esc(rel(dir))})</small></h1><ul>${rows || '<li><em>（空目录）</em></li>'}</ul>`
  );
}

function send(res, status, type, body, headers = {}) {
  const buf = Buffer.from(body);
  res.sentBytes = buf.length;
  res.writeHead(status, { 'Content-Type': type, 'Content-Length': buf.length, ...headers });
  res.end(buf);
}

function parseRange(header, size) {
  const m = /^bytes=(.+)$/i.exec(String(header).trim());
  if (!m) return null;
  if (m[1].includes(',')) return null; // 多段 range：不处理，直接给整文件
  const part = m[1].trim();
  const [startRaw, endRaw] = part.split('-');
  let start;
  let end;
  if (startRaw === '') {
    const suffix = Number(endRaw);
    if (!Number.isFinite(suffix) || suffix <= 0) return null;
    start = Math.max(size - suffix, 0);
    end = size - 1;
  } else {
    start = Number(startRaw);
    end = endRaw ? Number(endRaw) : size - 1;
  }
  if (!Number.isFinite(start) || !Number.isFinite(end)) return null;
  if (start > end || start >= size) return { invalid: true };
  return { start, end: Math.min(end, size - 1) };
}

function parseArgs(argv) {
  const out = { root: DEFAULTS.root, host: process.env.HOST || DEFAULTS.host, port: Number(process.env.PORT) || DEFAULTS.port, open: DEFAULTS.open, help: false };
  let rootFromCli = false;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => argv[++i];
    if (a === '-h' || a === '--help') out.help = true;
    else if (a === '--port' || a === '-p') out.port = Number(next());
    else if (a.startsWith('--port=')) out.port = Number(a.slice(7));
    else if (a === '--host') out.host = next();
    else if (a.startsWith('--host=')) out.host = a.slice(7);
    else if (a === '--open') out.open = true;
    else if (a === '--no-open') out.open = false;
    else if (a === '--root') {
      out.root = next();
      rootFromCli = true;
    } else if (!a.startsWith('-')) {
      out.root = a;
      rootFromCli = true;
    } else {
      fatal(`未知参数：${a}（试试 --help）`);
    }
  }
  if (!Number.isInteger(out.port) || out.port <= 0 || out.port > 65535) fatal(`端口不合法：${out.port}`);
  if (out.host === '*') out.host = '0.0.0.0';
  if (process.env.SERVE_ROOT) {
    out.root = process.env.SERVE_ROOT;
    rootFromCli = true;
  }
  // 默认 dist/ 相对仓库根目录，显式指定的路径相对当前工作目录
  out.root = path.isAbsolute(out.root) ? out.root : path.resolve(rootFromCli ? process.cwd() : REPO_ROOT, out.root);
  return out;
}

function url() {
  const host = HOST === '0.0.0.0' || HOST === '::' ? 'localhost' : HOST;
  return `http://${host.includes(':') && !HOST.startsWith('[') ? `[${host}]` : host}:${port}/`;
}

function openBrowser(target) {
  const cmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'cmd' : 'xdg-open';
  const argv = process.platform === 'win32' ? ['/c', 'start', '', target] : [target];
  try {
    spawn(cmd, argv, { stdio: 'ignore', detached: true }).unref();
  } catch {
    /* 打不开浏览器就算了，地址已经打印过 */
  }
}

function lanIPs() {
  const ips = [];
  for (const list of Object.values(os.networkInterfaces())) {
    for (const i of list || []) if (i.family === 'IPv4' && !i.internal) ips.push(i.address);
  }
  return ips;
}

function extname(file) {
  const base = path.basename(file);
  const dot = base.lastIndexOf('.');
  if (dot <= 0) return '';
  return base.slice(dot + 1).toLowerCase();
}

/** 请求 URL -> 已解码、去重复斜杠、以 / 开头的路径；非法输入返回 null */
function toPathname(rawUrl) {
  let pathname = String(rawUrl).split('?')[0].split('#')[0];
  if (!pathname.startsWith('/')) return null;
  try {
    pathname = decodeURIComponent(pathname);
  } catch {
    return null;
  }
  if (/\0|\\/.test(pathname)) return null; // 空字节 / 反斜杠
  return '/' + pathname.replace(/\/{2,}/g, '/').slice(1);
}

function safePathname(rawUrl) {
  const pathname = toPathname(rawUrl);
  if (pathname !== null) return pathname;
  return String(rawUrl).replace(/[\u0000-\u001f\u007f]/g, '?').slice(0, 200);
}

function humanSize(bytes) {
  if (bytes === null || !Number.isFinite(bytes)) return '-';
  const units = ['B', 'K', 'M', 'G'];
  let n = bytes;
  let u = 0;
  while (n >= 1024 && u < units.length - 1) {
    n /= 1024;
    u++;
  }
  return u === 0 ? `${n} B` : `${n.toFixed(n < 10 ? 1 : 0)}${units[u]}`;
}

function rel(p) {
  const r = path.relative(REPO_ROOT, p);
  return r && !r.startsWith('..') ? r : p;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

function colorize(name, text, stream = process.stdout) {
  if (!stream.isTTY || process.env.NO_COLOR) return String(text); // 输出被重定向时不加颜色
  const codes = { green: 32, red: 31, yellow: 33, cyan: 36, gray: 90, bold: 1 };
  return `\u001b[${codes[name]}m${text}\u001b[0m`;
}
function line(title) {
  return colorize('bold', `  ${title}`);
}

function log(req, res, ms) {
  const status = res.statusCode;
  const tag = status < 300 ? 'green' : status < 400 ? 'yellow' : 'red';
  const size = res.sentBytes !== undefined ? res.sentBytes : res.getHeader('content-length');
  console.log(
    `  ${colorize('gray', new Date().toTimeString().slice(0, 8))}  ${req.method.padEnd(4)}  ` +
      `${colorize(tag, String(status))}  ${(size ? humanSize(Number(size)) : '-').padStart(7)}  ${ms}ms  ` +
      `${colorize('gray', safePathname(req.url))}`,
  );
}

function fatal(message) {
  console.error(`${colorize('red', '  错误', process.stderr)}  ${message}\n`);
  process.exit(1);
}

function usage() {
  console.log(
    [
      'serve.js — 零依赖本地静态服务器（Node / Bun 通用）',
      '',
      '用法: node scripts/serve.js [目录] [选项]',
      '',
      '  目录 / --root 要服务的静态站点目录，默认 <仓库根>/dist/',
      '',
      '选项:',
      '  -p, --port    端口，默认 8080（被占用时自动 +1 重试）',
      '  --host        监听地址，默认 127.0.0.1；用 0.0.0.0 暴露到局域网',
      '  --open        启动后自动打开浏览器（默认在 TTY 下打开）',
      '  --no-open     不自动打开浏览器',
      '  -h, --help    显示本帮助',
      '',
      '环境变量: PORT / HOST / SERVE_ROOT / NO_COLOR',
      '',
      '示例:',
      '  node scripts/serve.js',
      '  bun scripts/serve.js --port 5173 --no-open',
      '  node scripts/serve.js dist --host 0.0.0.0',
      '',
    ].join('\n'),
  );
}
