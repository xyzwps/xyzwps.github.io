#!/bin/bash

set -e

if [ ! -d node_modules ]; then
  echo "缺少 node_modules，请先运行 npm install" >&2
  exit 1
fi

rm -rf dist
mkdir -p dist

cp -r tools            dist/tools
cp -r pages            dist/pages
cp -r assets           dist/assets
cp    .nojekyll        dist/.nojekyll
cp    BingSiteAuth.xml dist/BingSiteAuth.xml
cp    CNAME            dist/CNAME
cp    404.html         dist/404.html
cp    index.html       dist/index.html
cp    robots.txt       dist/robots.txt

echo "<!DOCTYPE html><html><body><code>Ver: $(date -u +%Y-%m-%dT%H:%M:%S)</code></body></html>" > dist/version.html

# HTML / CSS 只在 dist 里压缩，源文件保持可读。
node scripts/minify.js dist
