import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
// import login from './Login'

class UploadScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bkt_name: ''
        }
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
}

const style = {
    margin: 15,
};
export default UploadScreen;