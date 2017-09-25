import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardActions, CardTitle } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import './css/ShowBucketLists.css';
import NavigationDrawer from './MenuDrawer';
import RaisedButton from 'material-ui/RaisedButton';

const URL = 'http://localhost:5000/api/v1/bucketlists/'

class ShowBucketlists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bucketlists: [],
            access_token: '',
            user_name: '',
            error: ''
        }
        this.getToken = this.getToken.bind(this);
        this.deleteBucketList = this.deleteBucketList.bind(this);
        this.editBucketList = this.editBucketList.bind(this);
        this.showItems = this.showItems.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    editBucketList(id, name) {
        window.sessionStorage.bkt_id = id;
        window.sessionStorage.bkt_name = name;
        const userName = window.sessionStorage.userName;
        this.props.history.push(`/${userName}/edit-bucketlists/${id}`);
    }

    deleteBucketList(id) {
        var apiBaseUrl = "http://localhost:5000/api/v1/bucketlists/" + id.toString();
        axios.delete(apiBaseUrl,
            { headers: { "Content-Type": "application/json", "Authorization": window.sessionStorage.access_token } })
            .then(function (response) {
                window.location.reload();
            }
            ).bind(this);
    }

    showItems(id) {
        window.sessionStorage.bkt_id = id;
        this.props.history.push(`/${window.sessionStorage.userName}/${id}/show-items`);
    }

    handleAdd(event) {
        this.props.history.push(`/${this.state.user_name}/add-bucketlist`);
    }

    handleLogout(event) {
        this.props.history.push('/');
        window.sessionStorage.access_token = '';
    }

    getToken() {
        let access_token = window.sessionStorage.access_token;
        let user_name = window.sessionStorage.userName;
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

    componentDidMount() {
        this.getToken();

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
    }
    render() {
        const data = this.state.bucketlists;

        return (
            <div className="ShowBucketLists">
                <MuiThemeProvider>
                    <div>
                        <div>
                            <NavigationDrawer />
                        </div>
                        <AppBar title="All Bucket lists" />
                        <FlatButton label="Logout" onClick={(event) => this.handleLogout(event)} />
                        <br />
                        <RaisedButton label="Add Bucket list" primary={true} onClick={(event) => this.handleAdd(event)} />
                        <h2>Here are your current bucket lists</h2>
                        <div>
                            {data.map((bucketlist) =>
                                <Card key={bucketlist.bkt_name}>
                                    <CardTitle title={bucketlist.bkt_name} />
                                    <CardActions>
                                        <FlatButton label="Delete" onClick={(event) => this.deleteBucketList(bucketlist.id)} />
                                        <FlatButton label="Edit" onClick={(event) => this.editBucketList(bucketlist.id, bucketlist.bkt_name)} />
                                        <FlatButton label="Show Items" onClick={(event) => this.showItems(bucketlist.id)} />
                                    </CardActions>
                                </Card>
                            )}
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
export default ShowBucketlists;