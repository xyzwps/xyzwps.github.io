const meta = {
  title: 'Redis',
  path: 'redis',
  toc: [
    {
      section: '开始',
      children: [
        { title: '介绍', path: 'index' },
        { title: '安装', path: 'install' },
      ],
    },
    {
      section: '数据类型',
      children: [
        { title: 'Key 和 String', path: 'key-and-string' },
        { title: 'Hash', path: 'hash' },
        { title: 'List', path: 'list' },
        { title: 'Set', path: 'set' },
        { title: 'Zset', path: 'zset' },
        { title: 'Bitmap', path: 'bitmap' },
        { title: 'Geo', path: 'geo' },
        { title: 'HyperLogLog', path: 'hyperloglog' },
      ],
    },
    {
      section: '其他特性',
      children: [
        { title: 'Pipeline', path: 'pipeline' },
        { title: 'Select', path: 'select' },
      ],
    },
    {
      section: '持久化',
      children: [
        { title: '持久化在说什么', path: 'durability' },
        { title: '持久化方案', path: 'persistence' },
        { title: 'RDB', path: 'rdb' },
        { title: 'AOF', path: 'aof' },
      ],
    },
    {
      section: ' 使用场景',
      children: [{ title: 'Blogs', path: 'blogs' }],
    },
  ],
};
export default meta;
