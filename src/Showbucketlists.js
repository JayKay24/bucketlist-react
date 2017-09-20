import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardActions, CardTitle } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import './css/ShowBucketlists.css';

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
        this.deleteBucketList = this.deleteBucketList.bind(this);
        this.editBucketList = this.editBucketList.bind(this);
    }

    editBucketList(id, name) {
        console.log(id);
        window.sessionStorage.bkt_id = id;
        window.sessionStorage.bkt_name = name;
        this.props.history.push("edit-bucketlists");
    }

    deleteBucketList(id) {
        console.log(id);
        var apiBaseUrl = "http://localhost:5000/api/v1/bucketlists/" + id.toString();
        axios.delete(apiBaseUrl,
            { headers: { "Content-Type": "application/json", "Authorization": window.sessionStorage.access_token } })
            .then(function (response) {
                window.location.reload();
            }
            ).bind(this);
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
            .catch(function (e) {
                console.log("ERROR ", e);
            })
    }
    render() {
        const data = this.state.bucketlists;

        return (
            <div className="ShowBucketLists">
                <MuiThemeProvider>
                    <div>
                        <AppBar title="All Bucket lists" />
                        <h2>Here are your current bucket lists</h2>
                        <div>
                            {data.map((bucketlist) =>
                                <Card key={bucketlist.bkt_name}>
                                    <CardTitle title={bucketlist.bkt_name} />
                                    <CardActions>
                                        <FlatButton label="Delete" onClick={(event) => this.deleteBucketList(bucketlist.id)} />
                                        <FlatButton label="Edit" onClick={(event) => this.editBucketList(bucketlist.id, bucketlist.bkt_name)} />
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