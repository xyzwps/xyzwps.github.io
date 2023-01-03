import React from "react";

import BlogLayout from "../../components/BlogLayout";
import WebSiteList from "../../components/WebSiteList";

const List = [
  {
    section: "Performance",
    items: [
      {
        title: "Openjdk JMH",
        href: "https://github.com/openjdk/jmh",
        desc: "JMH is a Java harness for building, running, and analysing nano/micro/milli/macro benchmarks written in Java and other languages targeting the JVM.",
      },
    ],
  },
  {
    section: "Http Client",
    items: [
      {
        title: 'Retrofit',
        href: 'https://github.com/square/retrofit',
        desc: 'A type-safe HTTP client for Android and Java.'
      }
    ]
  }
];

function Frontend() {
  return (
    <BlogLayout>
      <WebSiteList title="前端学习" list={List} />
    </BlogLayout>
  );
}

export default Frontend;
