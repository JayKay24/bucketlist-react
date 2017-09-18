import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import Register from './Register';

class App extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   regist
    // }
  }
  /* Set the loginscreen as default page */
  // componentWillMount() {
  //   var loginPage = [];
  //   loginPage.push(<Loginscreen parentContext={this} />);
  //   this.setState({
  //     loginPage: loginPage
  //   })
  // }
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
