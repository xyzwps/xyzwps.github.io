/**
 * 解析简单的 yaml 文本。仅支持简单 yaml feature：
 * - 对象: key 对应的 value 要么是数组，要么是对象，要么是字符串
 * - 数组: 数组元素可以是对象，也可以是字符串。数组作为 value 时，元素标记 `-` 前面必须有缩进
 * - 缩进: 仅支持 2 空格缩进
 *
 * 其他细节
 * - 文本中所有的 `*` 都会被踢出
 * - 文本中以 '```' 开头的行都会被忽略
 * - 非对象、数组、数组元素中包含 ':' 的行都会被忽略
 *
 * @param str yaml 文本
 * @returns 对应的 json object
 */
export default function parseYaml(str: string) {
  const lines = str
    .split("\n") // 切成行
    // 移除空行
    .filter((line) => line.trim())
    // 移除 1) 行位空格 2) 行中星号 3）行中 ` 4) 行中 "
    .map((line) =>
      line.replaceAll("*", "").replaceAll("`", "").replaceAll('"', "").trimEnd()
    );

  return reduceLines(lines);
}

const REGEXP_OBJECT_KEY_NEST = /^[A-Za-z0-9_-]+:$/;
const REGEXP_OBJECT_KEY_VALUE = /^[A-Za-z0-9_-]+: /;

function reduceLines(lines: string[]) {
  if (lines.length === 0) {
    return undefined;
  }

  const firstLine = lines[0];
  if (
    REGEXP_OBJECT_KEY_NEST.test(firstLine) ||
    REGEXP_OBJECT_KEY_VALUE.test(firstLine)
  ) {
    return toObject(lines);
  }
  if (firstLine.startsWith("- ")) {
    return toArray(lines);
  }
  return firstLine;
}

function toObject(lines: string[]) {
  lines.push("_ignored: x"); // 为了处理方便，添加一个 _ignored: x

  const keyValues: [string, unknown][] = [];

  for (let i = 0; i < lines.length; ) {
    const line = lines[i];
    if (REGEXP_OBJECT_KEY_VALUE.test(line)) {
      const [key, value] = line.split(": ");
      keyValues.push([key, value]);
      i++; // 本 key: value 行读完了，继续下一行
    } else if (REGEXP_OBJECT_KEY_NEST.test(line)) {
      const key = line.substring(0, line.length - 1);
      const nestedLines: string[] = [];
      i++; // 本行只能搞到 key，下一行继续
      while (i < lines.length) {
        const nestedLine = lines[i];
        if (nestedLine.startsWith("  ")) {
          nestedLines.push(nestedLine.substring(2));
          i++; // 如果有缩进，就有嵌套。完了继续下一行
        } else {
          // 没缩进就结束，本行保留
          keyValues.push([key, reduceLines(nestedLines)]);
          break;
        }
      }
    } else {
      console.warn("[object] skip unhandled yaml line", line);
      i++;
    }
  }

  return keyValues.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
}

function toArray(lines: string[]): unknown[] {
  const result: unknown[] = [];
  for (let i = 0; i < lines.length; ) {
    const line = lines[i];
    if (line.startsWith("- ")) {
      const nestedLines: string[] = [line.substring(2)];
      i++; // 本行读完了，读下一行
      while (i < lines.length) {
        const nestedLine = lines[i];
        if (nestedLine.startsWith("  ")) {
          nestedLines.push(nestedLine.substring(2));
          i++;
        } else {
          break;
        }
      }

      if (nestedLines.length > 0) {
        result.push(reduceLines(nestedLines));
      }
    } else {
      console.warn("[array] skip unhandled yaml line", line);
      i++;
    }
  }

  return result;
}

const PLAN_YAML = `
- day: "1"
  actions:
    - from: "07:30"
      to: "08:00"
      action: "从德州东站乘坐高铁G106次前往北京南站"
    - from: "10:30"
      to: "11:30"
      action: "抵达北京南站，乘坐地铁4号线直达酒店办理入住"
    - from: "12:00"
      to: "13:30"
      action: "午餐：前门大街品尝老北京炸酱面"
    - from: "14:00"
      to: "17:30"
      action: "游览天坛公园（祈年殿、回音壁）"
    - from
`;

console.log(JSON.stringify(parseYaml(PLAN_YAML), null, 2));
