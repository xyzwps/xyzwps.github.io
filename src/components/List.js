import React from "react";

export default class List extends React.Component {
  render() {
    const { data, itemRender, itemKey } = this.props;
    return (
      <ol>
        {data.map((it) => (
          <li key={data[itemKey]}>{itemRender(it)}</li>
        ))}
      </ol>
    );
  }
}
