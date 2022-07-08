import React from 'react';
import JXGBoard from '@sswatson/jsxgraph-react-js';
import jsxGraphDemoLogic from '../data/jsxgraph/demo';

export default function Jsxgraph() {
  return (
    <div>
      <h1>It's blog time.</h1>
      <JXGBoard
        logic={jsxGraphDemoLogic}
        boardAttributes={{ axis: true, boundingbox: [-12, 10, 12, -10] }}
        style={{
          border: '3px solid red',
        }}
      />
    </div>
  );
}
