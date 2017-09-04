import React, { Component } from 'react';
// import { Route, IndexRoute } from 'react-router';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import App from './App'
import UploadScreen from './Uploadscreen'
import Register from './Register'
import Login from './Login'

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/addbucketlist" component={UploadScreen} />
        </div>
    </Router>,
    document.getElementById('root')
)

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
