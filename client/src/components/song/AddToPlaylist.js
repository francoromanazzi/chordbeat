import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPlaylists, addToPlaylist } from '../../actions/playlistsActions';

class AddToPlaylist extends Component {
  constructor() {
    super();
    this.state = {
      playlists: []
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) this.props.getPlaylists();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.playlists.playlists) {
      this.setState({ playlists: newProps.playlists.playlists });
    }
  }

  onClick = playlistID => {
    this.props.addToPlaylist(playlistID, this.props.song.song);
  };

  render() {
    let content;

    if (this.props.auth.isAuthenticated) {
      content = (
        <div className="dropdown">
          <button
            className="btn btn-block btn-md btn-outline-danger dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Add to playlist
          </button>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {this.state.playlists.map(playlist => (
              <button
                key={playlist._id}
                className="dropdown-item"
                onClick={this.onClick.bind(this, playlist._id)}
              >
                {playlist.title}
              </button>
            ))}
          </div>
        </div>
      );
    } else {
      content = (
        <Link
          to="/register"
          className="btn btn-block btn-md btn-outline-danger"
        >
          {' '}
          Add to playlist
        </Link>
      );
    }

    return content;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  playlists: state.playlists,
  errors: state.errors,
  song: state.song
});

export default connect(
  mapStateToProps,
  { getPlaylists, addToPlaylist }
)(AddToPlaylist);
