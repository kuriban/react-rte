import React from 'react';
import ReactDOM from 'react-dom';
import EditorDemo from './EditorDemo';

let rootNode = document.getElementById('root');

if (!rootNode) {
  rootNode = document.createElement('div');
  document.body.appendChild(rootNode);
}

ReactDOM.render(
  <EditorDemo />,
  rootNode,
);
