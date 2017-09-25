import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import Register from './Register';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        {Register}
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default App;
