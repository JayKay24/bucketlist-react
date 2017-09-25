import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import './css/Register.css';
import FlatButton from 'material-ui/FlatButton';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirm_password: '',
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
            <div className="Register">
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Register" />
                        <div>{this.state.error}</div>
                        <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange={(event, newValue) =>
                                this.setState({ username: newValue })}
                        />
                        <br />
                        <TextField
                            type="password"
                            hintText="Enter your password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) =>
                                this.setState({ password: newValue })}
                        />
                        <br />
                        <TextField
                            type="password"
                            hintText="Confirm your password"
                            floatingLabelText="Confirm Password"
                            onChange={(event, newValue) =>
                                this.setState({ confirm_password: newValue })}
                        />
                        <br />
                        <RaisedButton label="Submit" primary={true} style={style}
                            onClick={(event) => this.handleClick(event)}
                        />
                        <FlatButton label="Cancel" primary={true}
                            onClick={(event) => this.handleCancel(event)} />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }

    handleClick(event) {
        var apiBaseUrl = "http://localhost:5000/api/v1/";

        console.log("values", this.state.username, this.state.password);
        // To be done, check for empty values before hitting submit
        var payload = {
            "username": this.state.username,
            "password": this.state.password,
            "confirm_password": this.state.confirm_password
        };
        axios.post(apiBaseUrl + 'auth/register/', payload)
            .then(function (response) {
                console.log(response);
                if (response.status === 201) {
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

export default Register;