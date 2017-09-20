import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import NavigationDrawer from './MenuDrawer';
import axios from 'axios';
import './css/Login.css';
// import UploadScreen from './Uploadscreen'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            access_token: ''
        }
    }
    render() {
        // if (this.state.access_token) {
        //     window.sessionStorage.access_token = `Bearer ${this.state.access_token}`
        // }
        return (

            <div className="Login">
                <MuiThemeProvider>
                    <div>
                        <div>
                            <NavigationDrawer />
                        </div>
                        <div>
                            <AppBar title="Log in" />
                            <TextField
                                hintText="Enter your Username"
                                floatingLabelText="Username"
                                onChange={(event, newValue) =>
                                    this.setState({ username: newValue })} />
                            <br />
                            <TextField
                                type="password"
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                onChange={(event, newValue) =>
                                    this.setState({ password: newValue })} />
                            <br />
                            <RaisedButton label="Submit" primary={true}
                                style={style} onClick={(event) => this.handleClick(event)} />
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
    handleClick(event) {
        var apiBaseUrl = "http://localhost:5000/api/v1/auth/";
        var payload = {
            "username": this.state.username,
            "password": this.state.password
        }
        axios.post(apiBaseUrl + 'login/', payload)
            .then(function (response) {
                console.log(response);
                window.sessionStorage.access_token = `Bearer ${response.data['access_token']}`
                if (response.status === 200) {
                    console.log("Login successful");
                    // uploadScreen.push(<UploadScreen appContext={self.props.appContext} />)
                    this.setState({ access_token: response.data['access_token'] })
                    console.log(this.props)
                    // Redirect to the page to add a bucket list
                    this.props.history.push("/show-bucketlists");
                }
                else if (response.status === 204) {
                    console.log("Username and password do not match");
                    alert("username and password do not match");
                }
                else {
                    this.props.history.push("/login");
                }
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

}

const style = {
    margin: 15,
};
export default Login;