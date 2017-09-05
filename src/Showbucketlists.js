import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardHeader, CardActions, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
// import login from './Login'

class ShowBucketlists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bucketlists: [],
            error: ''
        }
    }
    componentDidMount() {
        this.getToken();
    }
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar title="All Bucket lists" />
                        <h2>Here are your current bucket lists</h2>

                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
    getToken() {
        const access_token = window.sessionStorage.access_token;
        if (access_token) {
            this.setState({
                access_token: access_token
            });
        } else {
            this.setState({
                error: "Token was not found"
            });
        }
    }
    handleClick(event) {
        var apiBaseUrl = "http://localhost:5000/api/v1/bucketlists/";
        var self = this;
        var payload = {
            "bkt_name": this.state.bkt_name
        }
        axios({
            method: 'get',
            url: apiBaseUrl,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": this.state.access_token
            }
        }).then(function (response) {
            console.log("RESPONSE", response.data)

            if (response.data.code == 200) {
                console.log(response.data)
                this.setState({ bucketlists: response.data })
            }
        }.bind(this));
        this.setState({ bkt_name: '' })
    }
}

const style = {
    margin: 15,
};
export default ShowBucketlists;