import React from "react";
import "./Nav.scss";

export class Nav extends React.Component {
  render() {
    const { children } = this.props;
    return <nav className="xn-nav">{children}</nav>;
  }
}

export class NavItem extends React.Component {
  render() {
    const { children } = this.props;
    return <span className="xn-nav-item">{children}</span>;
  }
}

export class NavLink extends React.Component {
  render() {
    const { children, href } = this.props;
    return (
      <a className="xn-nav-link" href={href}>
        {children}
      </a>
    );
  }
}
