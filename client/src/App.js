import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/set-auth-token';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentPlaylists } from './actions/playlistsActions';
import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import NotFound from './components/not-found/NotFound';
import Song from './components/song/Song';
import Playlists from './components/playlists/Playlists';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentPlaylists());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/not-found" component={NotFound} />
              <Switch>
                <PrivateRoute exact path="/playlists" component={Playlists} />
              </Switch>
            </div>
            <Route exact path="/song/:search" component={Song} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
