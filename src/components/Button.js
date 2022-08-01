import React from "react";
import classnames from "classnames";
import "./Button.scss";

export default class Button extends React.Component {
  render() {
    const { children, active, onClick } = this.props;
    return (
      <button className={classnames("xn-btn", active && "xn-btn-active")} onClick={onClick}>
        {children}
      </button>
    );
  }
}
