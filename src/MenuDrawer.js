import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

export default class NavigationDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
        this.handleAddBucketlist = this.handleAddBucketlist.bind(this);
    
    }
    handleToggle = () => this.setState({ open: !this.state.open });

    handleClose =  () => this.setState({ open: false });

    handleAddBucketlist() {
        this.props.history.push(`/${window.sessionStorage.userName}/add-bucketlist`)
        this.handleClose();  
    }; 

    render() {
        console.log(this.props)
        return (
            <div>
                <RaisedButton
                    label="Open navigation"
                    onClick={this.handleToggle}
                />
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}
                >
                    <MenuItem onClick={this.handleClose}>Add BucketList</MenuItem>
                    <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                </Drawer>
            </div>
        );
    }
}