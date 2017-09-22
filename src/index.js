import React from 'react';
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
import EditBucketList from './Editbucketlist';
import ShowItems from './ShowItems';
import EditItem from './EditItem';
import AddItem from './Additem';
import Start from './Start';

ReactDOM.render(
    <MuiThemeProvider>
        <Router>
            <div>
                <Route exact path="/" component={Start} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/:userName/add-bucketlist" component={UploadScreen} />
                <Route path="/:userName/show-bucketlists" component={ShowBucketlists} />
                <Route path="/:userName/edit-bucketlists/:id" component={EditBucketList} />
                <Route path="/:userName/:id/show-items" component={ShowItems} />
                <Route path="/:userName/edit-item/:id" component={EditItem} />
                <Route path="/:userName/:id/add-item/" component={AddItem} />
            </div>
        </Router>
    </MuiThemeProvider>,
    document.getElementById('root')
)

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
