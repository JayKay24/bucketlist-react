import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import AddiItem from './css/AddItem.css';
import FlatButton from 'material-ui/FlatButton';

class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item_name: '',
            access_token: '',
            error: ''
        };
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
    handleAdd(event) {
        const bkt_id = window.sessionStorage.bkt_id;
        var apiBaseUrl = "http://localhost:5000/api/v1/bucketlists/" + bkt_id + "/bucketlistitems/";
        var payload = {
            "bkt_item_name": this.state.item_name
        };
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
                this.props.history.push(`/${window.sessionStorage.userName}/${window.sessionStorage.bkt_id}/show-items`);
            }
        }.bind(this))
        this.setState({ item_name: '' })
    }
    handleCancel(event) {
        event.preventDefault();
        this.props.history.push(`/${this.state.userName}/${window.sessionStorage.bkt_id}/show-items`);
    }
    componentDidMount() {
        this.getToken();
    }
    render() {
        return (
            <div className="AddItem">
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Add Bucket list item" />
                        <form>
                            <h2>Please enter a bucket list item</h2>
                            <TextField
                                hintText="Enter your bucket list item"
                                floatingLabelFixed="Bucket list item"
                                onChange={(event, newValue) =>
                                    this.setState({ item_name: newValue })
                                }
                            />
                            <br />
                            <RaisedButton label="Add" primary={true}
                                onClick={(event) => this.handleAdd(event)} />
                            <FlatButton label="Cancel" onClick={(event) => this.handleCancel(event)} />
                        </form>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }

}
export default AddItem;