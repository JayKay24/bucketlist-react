import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import NavigationDrawer from './MenuDrawer';
import axios from 'axios';

class EditBucketList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bkt_name: '',
            access_token: '',
            error: ''
        };

        this.getToken = this.getToken.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    getToken() {
        const access_token = window.sessionStorage.access_token;
        if (access_token) {
            this.setState({
                access_token: access_token
            });
        }
        this.setState({bkt_name: window.sessionStorage.bkt_name});
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
        axios({
            method: 'patch',
            url: apiBaseUrl,
            data: payload,
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.state.access_token
            }
        }).then(function (response) {
            console.log("Bucketlist successfully edited");
            this.props.history.push("/show-bucketlists");
        }.bind(this))
        this.setState({ bkt_name: '' })
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Edit Bucket list" />
                        <form>
                            <h2>Edit your bucket list here</h2>
                            <TextField
                                hintText={window.sessionStorage.bkt_name}
                                floatingLabelFixed="Bucket List"
                                onChange={(event, newValue) =>
                                    this.setState({ bkt_name: newValue })}
                            />
                            <br />
                            <RaisedButton label="Save" primary={true}
                                style={style} onClick={(event) => this.handleSave(event, window.sessionStorage.bkt_id)} />
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