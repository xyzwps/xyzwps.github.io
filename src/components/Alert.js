import React from "react";
import "./Alert.scss";

const ALERT_TYPE_ICON = {
  note: "💡",
  warning: "⚠️",
};

export class Alert extends React.Component {
  render() {
    const { children, type, title, size } = this.props;
    return size === "small" ? (
      <SmallAlert {...{ children, type }} />
    ) : (
      <NormalAlert {...{ children, type, title }} />
    );
  }
}

class NormalAlert extends React.Component {
  render() {
    const { children, type, title } = this.props;
    return (
      <div className="xn-alert">
        <div className="xn-alert-title">
          {ALERT_TYPE_ICON[type || "note"] || ALERT_TYPE_ICON.note} {title}
        </div>
        <div className="xn-alert-content">{children}</div>
      </div>
    );
  }
}

class SmallAlert extends React.Component {
  render() {
    const { children, type } = this.props;
    return (
      <div className="xn-alert">
        <div className="xn-alert-content">
          {ALERT_TYPE_ICON[type || "note"] || ALERT_TYPE_ICON.note} {children}
        </div>
      </div>
    );
  }
}
