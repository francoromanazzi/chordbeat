import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPlaylists } from '../../actions/playlistsActions';
import isEmpty from '../../validation/is-empty';
import Spinner from '../common/Spinner';
import PlaylistItem from './PlaylistItem';

class Playlists extends Component {
  constructor() {
    super();
    this.state = {
      playlists: [],
      loading: false,
      error: false
    };
  }

  componentDidMount() {
    this.props.getPlaylists();
  }

  componentWillReceiveProps(newProps) {
    if (!isEmpty(newProps.playlists.playlists) && !newProps.playlists.loading) {
      this.setState({
        playlists: newProps.playlists.playlists,
        loading: newProps.playlists.loading
      });
    }

    if (newProps.playlists.loading) {
      this.setState({
        loading: newProps.playlists.loading
      });
    }

    if (newProps.errors) {
      this.setState({ error: newProps.errors.error });
    }
  }

  render() {
    const { playlists, loading, error } = this.state;
    let playlistsContent;

    if (error) {
      playlistsContent = (
        <div className="container">
          <h1 className="text-center">Error loading playlists</h1>
        </div>
      );
    } else if (isEmpty(playlists) || loading) {
      playlistsContent = <Spinner />;
    } else {
      playlistsContent = (
        <React.Fragment>
          <h3 className="display-3 text-center">My Playlists</h3>
          <hr className="mb-4" />
          <Link to="/playlists/create" style={{ textDecoration: 'none' }}>
            <button className="btn btn-outline-info btn-block btn-lg mb-3">
              Create new playlist
            </button>
          </Link>
          {playlists.map(playlist => (
            <PlaylistItem key={playlist._id} playlist={playlist} />
          ))}
        </React.Fragment>
      );
    }

    return playlistsContent;
  }
}

const mapStateToProps = state => ({
  playlists: state.playlists,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getPlaylists }
)(Playlists);
