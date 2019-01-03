import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearSong } from '../../actions/songActions';
//import TextFieldGroupSmall from '../common/TextFieldGroupSmall';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    };
  }

  onSubmit = e => {
    e.preventDefault();
    if (this.state.search.trim() === '') return;

    this.props.clearSong();

    const searchUrl = this.state.search.replace(/ /g, '+');
    this.props.history.push(`/song/${searchUrl}`);

    this.setState({ search: '' });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push('/');
  };

  /*
  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }
  */

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/playlists">
            My Playlists
          </Link>
        </li>
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-2 sticky-top">
        <div className="container">
          <Link className="navbar-brand mr-4" to="/">
            <b>Chordbeat</b>
          </Link>
          {/* BROKEN, TODO: FIX
          <div className="d-none d-sm-inline-block">
            
            <form onSubmit={this.onSubmit} className="form-inline">
              <TextFieldGroupSmall
                name="search"
                placeholder="Search a song"
                value={this.state.search}
                onChange={this.onChange}
              />
              <input type="submit" className="btn btn-outline-info btn-sm" />
            </form>         
          </div> */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearSong }
)(withRouter(Navbar));
