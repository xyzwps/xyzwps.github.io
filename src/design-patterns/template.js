import React from "react";
import Container from "../components/Container";
import { Link } from "../components/Router";

export default function DesignPatternsTemplate() {
  return (
    <Container>
      <h1>设计模式</h1>
      <ul>
        <li>
          <Link to="/design-patterns/cloud">云设计模式</Link>
        </li>
        <li>
          <Link to="/design-patterns/oo">面向对象设计模式</Link>
        </li>
      </ul>
    </Container>
  );
}
