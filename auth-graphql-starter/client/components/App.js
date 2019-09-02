import React, { Component } from 'react';
import Header from './layout/Header';
const App = props => {
  return (
    <div>
      <Header />
      <div className="container">{props.children}</div>
    </div>
  );
};
export default App;