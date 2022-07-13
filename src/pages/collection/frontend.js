import React from "react";

import BlogLayout from "../../components/BlogLayout";
import WebSiteList from "../../components/WebSiteList";

const List = [
  {
    section: "Fullstack",
    items: [
      {
        title: "Blitz",
        href: "https://blitzjs.com/",
        desc: "The Fullstack React Framework",
      },
    ],
  },
  {
    section: "React UI",
    items: [
      {
        title: "Onsen UI",
        href: "https://onsen.io/",
        desc: "The most beautiful and efficient way to develop HTML5 hybrid and mobile web apps.",
      },
      {
        title: "Evergreen",
        href: "https://evergreen.segment.com/",
        desc: "Meet Evergreen, Segment’s design system.",
      },
      {
        title: "Semantic UI React",
        href: "https://react.semantic-ui.com/",
        desc: "The official Semantic-UI-React integration.",
      },
      {
        title: "grommet",
        href: "https://v2.grommet.io/",
        desc: "streamline the way you develop apps",
      },
      {
        title: "React Toolbox",
        href: "https://github.com/react-toolbox/react-toolbox",
        desc: "A set of React components implementing Google's Material Design specification with the power of CSS Modules",
      },
      {
        title: "Blueprint",
        href: "https://blueprintjs.com/",
        desc: "A React-based UI toolkit for the web",
      },
      {
        title: "React Desktop",
        href: "http://reactdesktop.js.org/",
        desc: "React UI Components for macOS High Sierra and Windows 10",
      },
      {
        title: "Gestalt",
        href: "https://gestalt.pinterest.systems/home",
        desc: "Gestalt is Pinterest’s design system",
      },
      {
        title: "MUI",
        href: "https://mui.com/zh/",
        desc: "Move faster with intuitive React UI tools",
      },
      {
        title: "Fluent UI",
        href: "https://developer.microsoft.com/fluentui",
        desc: "Fluent UI web represents a collection of utilities, React components, and web components for building web applications.",
      },
      {
        title: "Rebass",
        href: "https://rebassjs.org/",
        desc: "REACT PRIMITIVE UI COMPONENTS BUILT WITH STYLED SYSTEM",
      },
      {
        title: "React Suite",
        href: "https://rsuitejs.com/",
        desc: "A suite of React components, sensible UI design, and a friendly development experience.",
      },
      {
        title: "Ant Design",
        href: "https://ant.design/",
        desc: "A design system for enterprise-level products. Create an efficient and enjoyable work experience.",
      },
      {
        title: "React Bootstrap",
        href: "https://react-bootstrap.github.io/",
        desc: "The most popular front-end framework rebuilt for React.",
      },
    ],
  },
  {
    section: "学习资料",
    items: [
      {
        title: "react-component",
        href: "https://github.com/react-component",
        desc: "React components foundation of ant.design",
      },
      {
        title: "React Firebase Starter",
        href: "https://github.com/kriasoft/react-firebase-starter",
        desc: "Boilerplate (seed) project for creating web apps with React.js, GraphQL.js and Relay",
      },
    ],
  },
  {
    section: "图形库",
    items: [
      {
        title: "JSXGraph",
        href: "https://jsxgraph.uni-bayreuth.de/wp/",
        desc: "Dynamic Mathematics with JavaScript",
      },
      {
        title: "Paper.js",
        href: "http://paperjs.org/",
        desc: "The Swiss Army Knife of Vector Graphics Scripting.",
      },
      {
        title: "Fabric.js",
        href: "http://fabricjs.com/",
        desc: "A powerful and simple Javascript HTML5 canvas library",
      },
      {
        title: "Konva.js",
        href: "https://konvajs.org/",
        desc: "HTML5 2d canvas js library for desktop and mobile applications",
      },
      {
        title: "PixiJS",
        href: "https://pixijs.com/",
        desc: "The HTML5 Creation Engine. Create beautiful digital content with the fastest, most flexible 2D WebGL renderer.",
      },
    ],
  },
  {
    section: "一些库",
    items: [
      {
        title: "MathJax",
        href: "https://www.mathjax.org/",
        desc: "Beautiful and accessible math in all browsers",
      },
      {
        title: "Katex",
        href: "https://katex.org/",
        desc: "The fastest math typesetting library for the web.",
      },
      {
        title: "Prism.js",
        href: "https://prismjs.com/",
        desc: "Prism is a lightweight, extensible syntax highlighter, built with modern web standards in mind. It’s used in millions of websites, including some of those you visit daily.",
      },
      { title: "highlight.js", href: "highlight.js", desc: "Syntax highlighting for the Web" },
      {
        title: "MDX",
        href: "https://mdxjs.com/",
        desc: "Markdown for theccomponent era",
      },
    ],
  },
  {
    section: "博客",
    items: [{ title: "Build your own react", href: "https://pomb.us/build-your-own-react/" }],
  },
];

function Frontend() {
  return (
    <BlogLayout>
      <WebSiteList title="前端学习" list={List} />
    </BlogLayout>
  );
}

export default Frontend;
