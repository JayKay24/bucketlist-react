import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import './css/Login.css';
import FlatButton from 'material-ui/FlatButton';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            access_token: '',
            error: ''
        }
        this.handleCancel = this.handleCancel.bind(this);
    }
    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/');
    }
    render() {
        return (

            <div className="Login">
                <MuiThemeProvider>
                    <div>
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
                            <FlatButton label="Cancel" primary={true}
                                onClick={(event) => this.handleCancel(event)} />
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
        if (!payload.username || !payload.password) {
            alert("Please enter a valid username and password");
        }
        axios.post(apiBaseUrl + 'login/', payload)
            .then(function (response) {
                window.sessionStorage.access_token = `Bearer ${response.data['access_token']}`;
                window.sessionStorage.userName = response.data['username'];
                if (response.status === 200) {
                    this.setState({ access_token: response.data['access_token'] })
                    this.props.history.push(`/${response.data['username']}/show-bucketlists`)
                }
                else if (response.status === 204) {
                    alert("username and password do not match");
                }
                else {
                    this.props.history.push("/login");
                }
            }.bind(this));
        if (!window.sessionStorage.access_token) {
            alert("Invalid credentials! Please provide correct login information.")
        }
    }

}

const style = {
    margin: 15,
};
export default Login;