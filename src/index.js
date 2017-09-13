import React, { Component } from 'react';
// import { Route, IndexRoute } from 'react-router';
import ReactDOM from 'react-dom';
import './css/index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import App from './App'
import UploadScreen from './Uploadscreen';
import Register from './Register';
import Login from './Login';
import ShowBucketlists from './Showbucketlists';

ReactDOM.render(
    <MuiThemeProvider>
        <Router>
            <div>
                <Route exact path="/" component={App} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/add-bucketlist" component={UploadScreen} />
                <Route exact path="/show-bucketlists" component={ShowBucketlists} />
            </div>
        </Router>
    </MuiThemeProvider>,
    document.getElementById('root')
)

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
