import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
// import login from './Login'

const CardList = (props) => {
    return (
        <div>
            {props.cards.map(card => <Card key={card.id} {...card} />)}
        </div>
    );
};

const Card = (props) => {
    return (
        <div style={{margin: '1em'}}>
            <div style={{ display: 'inline-block', marginLeft: 10 }}>
                <div style={{ fontsize: '1.25em', fontWeight: 'bold' }}>
                    {props.id}
                </div>
                <div style={{ fontsize: '1.25em', fontWeight: 'bold' }}>
                    {props.bkt_name}
                </div>
            </div>
        </div>
    );
};

class Bucketlists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bkt_name: ''
        }
    }
    render (){
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Bucketlists" />
                        <TextField
                            hintText="Enter the bucketlist name" 
                            floatingLabelText="Bucketlist name"
                            onChange={(event,newValue) => 
                                this.setState({ bkt_name:newValue })}
                        />
                        <br />
                        <RaisedButton label="Submit" primary={true} style={style}
                            onClick={(event) => this.handleClick(event)}
                         />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }

    handleClick(event) {
        var apiBaseUrl = "http://localhost:5000/api/v1/";

        console.log("value", this.state.bkt_name);
        var self = this;
        var payload = {
            "bkt_name": this.state.bkt_name
        };
        axios.post(apiBaseUrl + 'bucketlists/', payload)
            .then(function (response) {
                console.log(response);
                if (response.data.code == 200) {
                    
                }
            })
    }
}