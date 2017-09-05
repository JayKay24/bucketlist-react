import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardHeader, CardActions, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

const URL = 'http://localhost:5000/api/v1/bucketlists/'

class ShowBucketlists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bucketlists: [],
            access_token: '',
            error: ''
        }
        this.getToken = this.getToken.bind(this);
    }
    getToken() {
        let access_token = window.sessionStorage.access_token;
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
    componentDidMount() {
        this.getToken;
        axios({
            method: 'get',
            url: URL,
            headers: {
                "Content-Type": "application/json",
                "Authorization": window.sessionStorage.access_token
            }
        }).then(function (response) {
            this.setState({
                bucketlists: response.data.results
            });
        }.bind(this))
            .catch(function (e) {
                console.log("ERROR ", e);
            })
    }
    render() {
        const data = this.state.bucketlists
        const renderItems = data.map(function (bucketlist, i) {
            return (<li key={i}>{bucketlist.bkt_name}</li>)
        });
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar title="All Bucket lists" />
                        <h2>Here are your current bucket lists</h2>
                        <ul>
                            {renderItems}
                        </ul>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const style = {
    margin: 15,
};
export default ShowBucketlists;