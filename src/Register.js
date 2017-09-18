import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirm_password: ''
        }
    }
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Register" />
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
                } else if (response.data.code === 400) {
                    console.log(response.data)
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