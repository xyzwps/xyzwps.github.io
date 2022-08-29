import React from "react";
import { SHA256, enc } from "crypto-js";

class HashTools extends React.Component {
  state = {
    source: "",
    target: "",
  };

  makehash = () => {
    const { hashFunction } = this.props;
    this.setState({ target: hashFunction(this.state.source) });
  };

  render() {
    const { title } = this.props;
    const { source, target } = this.state;
    return (
      <div style={{ maxWidth: 800, margin: "8px auto" }}>
        <h2>{title}</h2>
        <div>
          <textarea
            rows={2}
            style={{ width: "100%" }}
            value={source}
            placeholder="请输入要 hash 的值，然后点击【Hash】按钮"
            onChange={(e) => this.setState({ source: e.target.value })}
          />
        </div>
        <button onClick={this.makehash}>Hash</button>
        <pre>{target}</pre>
      </div>
    );
  }
}

const HashToolsPage = () => (
  <div>
    <HashTools title="sha256hex" hashFunction={(v) => SHA256(v).toString(enc.Hex)} />
  </div>
);

export default HashToolsPage;
