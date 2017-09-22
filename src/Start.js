import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardActions, CardTitle } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import './css/Start.css';
import RaisedButton from 'material-ui/RaisedButton';


class Start extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }
    handleLogin(event){
        event.preventDefault();
        this.props.history.push(`/login`);
    }
    handleRegister(event){
        event.preventDefault();
        this.props.history.push(`/register`);
    }
    render() {
        return (
            <div className="Start">
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Home" />
                        <div>
                            <p>Hello, Welcome to Bucket List Creator.</p>
                            <p>
                                Everyone has hopes and dreams. With Bucket List Creator, you
                                can store all your hopes and dreams in one place, and make them
                                come true. One by one.
                            </p>
                        </div>
                        <div>
                            <p>What would you like to do?</p>
                            <RaisedButton label="Login" primary={true} 
                                style={style} onClick={(event) => this.handleLogin(event)} />
                            <br />
                            <RaisedButton label="Register" primary={true}
                                style={style} onClick={(event) => this.handleRegister(event)} />
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
const style = {
    margin: 15,
};

export default Start;