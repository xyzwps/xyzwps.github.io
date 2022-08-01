import React from "react";

import GENSHIN_CHARACTERS from "./data.genshin-characters";

import Table from "../components/Table";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 3;

export default class ClassicPagination extends React.Component {
  state = {
    currentPageNo: 1,
    data: GENSHIN_CHARACTERS,
    pageSize: PAGE_SIZE,
    pageData: [],
    totalPageNo: 0,
  };

  componentDidMount() {
    this.calcPageData(1);
  }

  columns = [
    { title: "名字", key: "name", dataIndex: "name", width: 90 },
    { title: "性别", key: "gender", dataIndex: "gender", width: 60 },
    { title: "元素属性", key: "element", dataIndex: "element", width: 90 },
    { title: "地区", key: "region", dataIndex: "region"},
  ];

  calcPageData = (pageNo) => {
    const { data, pageSize } = this.state;
    const pageData = data.slice((pageNo - 1) * pageSize, Math.min(data.length, pageNo * pageSize));
    const totalPageNo = Math.ceil(data.length / pageSize);
    this.setState({ pageData, totalPageNo, currentPageNo: pageNo });
  };

  handlePageChanged = (newPageNo) => {
    this.calcPageData(newPageNo);
  };

  render() {
    const { currentPageNo, pageData, totalPageNo } = this.state;
    return (
      <div style={{ maxWidth: 400, margin: "4px auto" }}>
        <Table columns={this.columns} rowKey="name" data={pageData} />
        <div style={{ textAlign: "right", margin: "8px 0" }}>
          <Pagination
            currentPageNo={currentPageNo}
            totalPageCount={totalPageNo}
            onChange={this.handlePageChanged}
          />
        </div>
      </div>
    );
  }
}
