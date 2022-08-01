import React from "react";

import Button from "./Button";

export default class Pagination extends React.Component {
  handleChange = (pageNo) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pageNo);
    }
  };

  render() {
    const { currentPageNo, totalPageCount } = this.props;

    const pageButtons = [];
    for (let i = 1; i <= totalPageCount; i++) {
      pageButtons.push(
        <Button
          key={i}
          active={currentPageNo === i}
          onClick={currentPageNo === i || (() => this.handleChange(i))}
        >
          {i}
        </Button>
      );
    }

    return (
      <div>
        共{totalPageCount}页 {pageButtons}
      </div>
    );
  }
}
