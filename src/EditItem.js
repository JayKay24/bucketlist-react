import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import NavigationDrawer from './MenuDrawer';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import './css/EditItem.css';

class EditItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item_name: '',
            item_id: '',
            bkt_id: '',
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
        const itemId = window.sessionStorage.item_id;
        const bkt_id = window.sessionStorage.bkt_id;
        if (access_token) {
            this.setState({
                access_token: access_token,
                userName: userName,
                item_id: itemId,
                bkt_id: bkt_id,
                item_name: ''
            });
        }
        this.setState({ item_name: window.sessionStorage.item_name });
    }

    componentDidMount() {
        this.getToken();
    }

    handleSave(event, id) {
        event.preventDefault();
        const bkt_id = window.sessionStorage.bkt_id;
        var apiBaseUrl = "http://localhost:5000/api/v1/bucketlists/" + bkt_id.toString() + "/bucketlistitems/" + id.toString();
        var payload = {
            "bkt_item_name": this.state.item_name
        };
        axios({
            method: 'patch',
            url: apiBaseUrl,
            data: payload,
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.state.access_token
            }
        }).then(function (response) {
            this.props.history.push(`/${this.state.userName}/${this.state.bkt_id}/show-items`);
        }.bind(this))
        this.setState({ item_name: '' })
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push(`/${this.state.userName}/${window.sessionStorage.bkt_id}/show-items`);
    }

    render() {
        return (
            <div className="EditItem">
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Edit Bucket list item" />
                        <form>
                            <h2>Edit your bucket list item here</h2>
                            <TextField
                                hintText={window.sessionStorage.item_name + ',' + this.props.match.params.id.toString()}
                                floatingLabelFixed="Bucket list item"
                                onChange={(event, newValue) =>
                                    this.setState({ item_name: newValue })}
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

export default EditItem;