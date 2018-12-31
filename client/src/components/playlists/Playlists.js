import React, { Component } from 'react';
import { connect } from 'react-redux';
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

    if (newProps.errors) {
      this.setState({ error: newProps.errors.error });
    }
  }

  render() {
    const { playlists, loading, error } = this.state;
    let playlistsContent;

    if (error) {
      playlistsContent = (
        <div class="container">
          <h1 className="text-center">Tab not found</h1>
          <h3 className="text-center">Please, modify your search</h3>
        </div>
      );
    } else if (isEmpty(playlists) || loading) {
      playlistsContent = <Spinner />;
    } else {
      playlistsContent = (
        <React.Fragment>
          <h3 className="display-3 text-center">My Playlists</h3>
          <hr className="mb-4" />
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
