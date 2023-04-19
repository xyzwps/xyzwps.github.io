import React from "react";
import Button from "../../components/Button";
import Table from "../../components/Table";

import GENSHIN_CHARACTERS from "./data.genshin-characters";

function load(cursor, size) {
  const loadSize = size + 1;
  const data = GENSHIN_CHARACTERS.slice(
    cursor,
    Math.min(cursor + loadSize, GENSHIN_CHARACTERS.length)
  );
  const hasMore = data.length > size;
  return {
    data: data.slice(0, Math.min(size, data.length)),
    hasMore,
  };
}

const GENDER = {
  男: () => <span style={{ color: "blueviolet" }}>♂</span>,
  女: () => <span style={{ color: "pink" }}>♀</span>,
};

const ELEMENT_COLOR = {
  风: "aliceblue",
  水: "lightblue",
  火: "rede",
  冰: "lightgreen",
  岩: "gold",
  雷: "purple",
  草: "green",
};

function Character({ c }) {
  const Gender = GENDER[c.gender];
  return (
    <span>
      {<Gender />} <span style={{ color: ELEMENT_COLOR[c.element] }}>{c.name}</span> {c.region}
    </span>
  );
}

export default class InfinitePagination extends React.Component {
  state = {
    data: [],
    hasMore: false,
    cursor: 0,
  };

  componentDidMount() {
    this.loadMore();
  }

  loadMore = () => {
    const { data, cursor } = this.state;
    const loaded = load(cursor, 3);
    const newData = [...data, ...loaded.data];
    this.setState({ data: newData, hasMore: loaded.hasMore, cursor: newData.length });
  };

  retry = () => {
    this.setState({ data: [], hasMore: false, cursor: 0 }, () => this.loadMore());
  };

  columns = [
    { title: "名字", key: "name", dataIndex: "name", width: 90 },
    { title: "性别", key: "gender", dataIndex: "gender", width: 60 },
    { title: "元素属性", key: "element", dataIndex: "element", width: 90 },
    { title: "地区", key: "region", dataIndex: "region" },
  ];

  render() {
    const { data, hasMore } = this.state;
    return (
      <div style={{ maxWidth: 400, margin: "4px auto" }}>
        <Table columns={this.columns} rowKey="name" data={data} />
        <div style={{ textAlign: "center", margin: 8 }}>
          {hasMore ? (
            <Button onClick={this.loadMore}>戳这里加载更多</Button>
          ) : (
            <span
              style={{ cursor: "pointer", color: "gray", fontSize: "0.8rem" }}
              onClick={this.retry}
            >
              示例已到底了。再体验一次？
            </span>
          )}
        </div>
      </div>
    );
  }
}
