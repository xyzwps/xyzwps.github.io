import React from "react";

import './Table.scss'

export default class Table extends React.Component {
  render() {
    const { columns, data, rowKey } = this.props;
    return (
      <table className="xn-table">
        <thead>
          <tr>
            {columns.map((it) => (
              <th key={it.key} style={it.width && { width: it.width }}>
                {it.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row[rowKey]}>
              {columns.map((col) => (
                <td key={col.key}>{row[col.dataIndex]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
