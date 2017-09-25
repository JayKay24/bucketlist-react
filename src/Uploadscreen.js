import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import './css/UploadScreen.css';
import FlatButton from 'material-ui/FlatButton';

class UploadScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bkt_name: '',
            access_token: '',
            user_name: '',
            error: ''
        };
        this.handleCancel = this.handleCancel.bind(this);
    }
    handleCancel(event) {
        this.props.history.push(`/${this.state.user_name}/show-bucketlists`);
    }
    componentDidMount() {
        this.getToken();
    }
    render() {
        return (
            <div className="UploadScreen">
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
                            <FlatButton label="Cancel" onClick={(event) => this.handleCancel(event)} />
                        </form>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
    getToken() {
        const user_name = window.sessionStorage.userName;
        const access_token = window.sessionStorage.access_token;
        if (access_token) {
            this.setState({
                access_token: access_token,
                user_name: user_name
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
            if (response.status === 201) {
                this.props.history.push(`/${this.state.user_name}/show-bucketlists`);
            }
        }.bind(this))
        this.setState({ bkt_name: '' })
    }
}

const style = {
    margin: 15,
};
export default UploadScreen;