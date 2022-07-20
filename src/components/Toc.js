import React from "react";

import "./Toc.scss";

/**
 * 只有一层的 toc
 *
 * @param {object} props
 * @param {Array} props.list
 * @param {Function} props.itemRender
 * @param {Function} props.itemKey
 */
export function Toc1({ list, itemRender, itemKey }) {
  return (
    <ul className="xn-toc1">
      {(list || []).map((it) => (
        <li className="xn-toc1-item" key={itemKey(it)}>
          {itemRender(it)}
        </li>
      ))}
    </ul>
  );
}
