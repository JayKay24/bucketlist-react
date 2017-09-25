import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardActions, CardTitle } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import './css/ShowBucketLists.css';
import NavigationDrawer from './MenuDrawer';
import './css/Showitems.css'
import RaisedButton from 'material-ui/RaisedButton';

var loadOnce = function () {
    if (!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}

const bkt_id = window.sessionStorage.bkt_id;
if (bkt_id === undefined) {
    const URL = 'None';
} else {
    const URL = 'http://localhost:5000/api/v1/bucketlists/' + bkt_id.toString() + '/bucketlistitems/';
}

class ShowItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            access_token: '',
            user_name: '',
            error: ''
        }
        this.getToken = this.getToken.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleBack(event) {
        this.props.history.push(`/${window.sessionStorage.userName}/show-bucketlists`)
    }
    handleAdd(event) {
        event.preventDefault();
        this.props.history.push(`/${this.state.user_name}/${window.sessionStorage.bkt_id}/add-item`);
    }

    editItem(id, name) {
        window.sessionStorage.item_id = id;
        window.sessionStorage.item_name = name;
        const userName = window.sessionStorage.userName;
        this.props.history.push(`/${userName}/edit-item/${id}`);
    }
    deleteItem(id, name) {
        const bkt_id = window.sessionStorage.bkt_id;
        var apiBaseUrl = "http://localhost:5000/api/v1/bucketlists/" + bkt_id.toString() + "/bucketlistitems/" + id.toString();
        axios.delete(apiBaseUrl,
            { headers: { "Content-Type": "application/json", "Authorization": window.sessionStorage.access_token } }
        ).then((response) => window.location.reload()).bind(this);
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
            this.setState({ items: response.data.result })
        }.bind(this))
        loadOnce();
    }
    render() {
        const data = this.state.items;
        return (
            <div className="ShowItems">
                <MuiThemeProvider>
                    <div>
                        <div>
                            <NavigationDrawer />
                        </div>
                        <AppBar title="All Bucketlist items" />
                        <RaisedButton label="Add Item" primary={true} onClick={(event) => this.handleAdd(event)} />
                        <FlatButton label="Back" onClick={(event) => this.handleBack(event)} />
                        <h2>Here are your bucketlist items</h2>
                        <div>
                            {data.map((item) =>
                                <Card key={item.bkt_item_name}>
                                    <CardTitle title={item.bkt_item_name} />
                                    <CardActions>
                                        <FlatButton label="Delete" onClick={(event) => this.deleteItem(item.id)} />
                                        <FlatButton label="Edit" onClick={(event) => this.editItem(item.id, item.bkt_item_name)} />
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
export default ShowItems;