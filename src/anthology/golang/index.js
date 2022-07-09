const meta = {
  title: "golang",
  path: "golang",
  toc: [
    {
      section: "开始",
      children: [
        { title: "引言", path: "index" },
        { title: "第一个程序", path: "first-program" },
        { title: "杂项", path: "basic" },
      ],
    },
    {
      section: "流程控制语句",
      children: [
        { title: "if 语句", path: "if" },
        { title: "switch 语句", path: "switch" },
        { title: "for 语句", path: "for" },
        { title: "defer 语句", path: "defer" },
      ],
    },
    {
      section: "函数",
      children: [
        { title: "函数", path: "func" },
        { title: "特殊函数", path: "special-func" },
      ],
    },
    {
      section: "常见类型与变量",
      children: [
        { title: "基本类型", path: "basic-types" },
        { title: "变量与常量", path: "var" },
        { title: "字符串", path: "string" },
        { title: "指针", path: "pointer" },
        { title: "数组和 slice", path: "array-slice" },
        { title: "map", path: "map" },
      ],
    },
    {
      section: "自定义数据类型",
      children: [
        { title: "struct", path: "struct" },
        { title: "type 关键字", path: "type" },
        { title: "interface", path: "interface" },
        { title: "泛型", path: "generic" },
        { title: "等值比较", path: "equal" },
      ],
    },
    {
      section: "错误处理",
      children: [
        { title: "error", path: "error" },
        { title: "panic-recover", path: "panic" },
      ],
    },
    {
      section: "常见问题",
      children: [
        { title: "不相等的 nil", path: "notes-nil" },
        { title: "深复制", path: "notes-deep-clone" },
        { title: "instanceof", path: "instanceof" },
      ],
    },
    {
      section: "其他",
      children: [
        { title: "并发", path: "concurrency" },
        { title: "包和导入", path: "pkg-import" },
      ],
    },
  ],
};

export default meta;
