import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import NavigationDrawer from './MenuDrawer';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import './css/Editbucketlist.css';

class EditBucketList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bkt_name: '',
            access_token: '',
            userName: '',
            error: ''
        };

        this.getToken = this.getToken.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    getToken() {
        const access_token = window.sessionStorage.access_token;
        const userName = window.sessionStorage.userName;
        if (access_token) {
            this.setState({
                access_token: access_token,
                userName: userName
            });
        }
        this.setState({ bkt_name: window.sessionStorage.bkt_name });
    }

    componentDidMount() {
        this.getToken();
    }

    handleSave(event, id) {
        event.preventDefault();
        var apiBaseUrl = "http://localhost:5000/api/v1/bucketlists/" + id.toString();
        var payload = {
            "bkt_name": this.state.bkt_name
        };
        if (payload.bkt_name == window.sessionStorage.bkt_name) {
            alert("A bucketlist with the same content already exists");
        } else {
            alert("Please provide a valid bucket list name");
        }
        axios({
            method: 'patch',
            url: apiBaseUrl,
            data: payload,
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.state.access_token
            }
        }).then(function (response) {
            this.props.history.push(`/${this.state.userName}/show-bucketlists`);
        }.bind(this))
        this.setState({ bkt_name: '' })
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push(`/${this.state.userName}/show-bucketlists`);
    }

    render() {
        return (
            <div className="Editbucketlist">
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Edit Bucket list" />
                        <form>
                            <h2>Edit your bucket list here</h2>
                            <TextField
                                hintText={window.sessionStorage.bkt_name + ',' + this.props.match.params.id.toString()}
                                floatingLabelFixed="Bucket List"
                                onChange={(event, newValue) =>
                                    this.setState({ bkt_name: newValue })}
                            />
                            <br />
                            <RaisedButton label="Save" primary={true}
                                style={style} onClick={(event) => this.handleSave(event, this.props.match.params.id)} />
                            <FlatButton label="Cancel" onClick={(event) => this.handleCancel(event)} />
                        </form>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const style = {
    margin: 15,
};

export default EditBucketList;