import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Loginscreen from './Loginscreen';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      uploadScreen:[]
    }
  }
  componentWillMount(){
    var loginPage = [];
    loginPage.push(<Loginscreen parentContext={this} />);
    this.setState({
      loginPage:loginPage
    })
  }
  render() {
    return (
      <div className="App">
        {this.state.loginPage}
        {this.state.uploadScreen}
        // <div className="App-header">
        //   <img src={logo} className="App-logo" alt="logo" />
        //   <h2>Welcome to React</h2>
        // </div>
        // <p className="App-intro">
        //   To get started, edit <code>src/App.js</code> and save to reload.
        // </p>
      </div>
    );
  }
}

const style = {
  margin:15,
};

export default App;
