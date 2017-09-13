import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

export default class NavigationDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }
    handleToggle = () => this.setState({ open: !this.state.open });

    handleClose = () => this.setState({ open: false });

    render() {
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
                    <MenuItem onClick={this.handleClose}>Register</MenuItem>
                    <MenuItem onClick={this.handleClose}>Add BucketList</MenuItem>
                </Drawer>
            </div>
        );
    }
}