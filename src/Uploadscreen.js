import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardHeader } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
// import login from './Login'

class UploadScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bkt_name: '',
            access_token: '',
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
                        <AppBar title="Bucketlists" />
                        <form>
                            <h2>Please enter a Bucket list</h2>
                            <TextField
                                hintText="Enter your bucketlist"
                                floatingLabelFixed="Bucket list"
                                onChange={(event, newValue) =>
                                    this.setState({ bkt_name: newValue })}
                            />
                            <br />
                            <RaisedButton label="Submit" primary={true}
                                style={style} onClick={(event) => this.handleClick(event)} />
                        </form>
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
        event.preventDefault();
        var apiBaseUrl = "http://localhost:5000/api/v1/bucketlists/";
        var self = this;
        var payload = {
            "bkt_name": this.state.bkt_name
        }
        axios({
            method: 'post',
            url: apiBaseUrl,
            data: payload,
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.state.access_token
            }
        }).then(function (response) {
            if (response.status == 201) {
                console.log("Bucketlist successfully added");
                this.props.history.push("/show-bucketlists");
            }
        }.bind(this))
        this.setState({ bkt_name: '' })
    }
}

const style = {
    margin: 15,
};
export default UploadScreen;