import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaiseButton from 'material-ui/RaisedButton';
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
}

const style = {
    margin: 15,
};

export default Register;