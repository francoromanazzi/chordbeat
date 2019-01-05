import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPlaylists, addToPlaylist } from '../../actions/playlistsActions';
import Spinner from '../common/Spinner';

class AddToPlaylist extends Component {
  constructor() {
    super();
    this.state = {
      playlists: [],
      waitingForHeaderToken: false
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.headerToken) this.props.getPlaylists();
      else this.setState({ waitingForHeaderToken: true });
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.playlists.playlists) {
      this.setState({ playlists: newProps.playlists.playlists });
    }

    if (
      newProps.auth.headerToken === true &&
      this.state.waitingForHeaderToken
    ) {
      this.props.getPlaylists();
      this.setState({ waitingForHeaderToken: false });
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
            className="btn btn-block btn-md btn-outline-info dropdown-toggle"
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
            <Link to="/playlists/create" style={{ textDecoration: 'none' }}>
              <button className="dropdown-item text-info">
                Create new playlist
                <i
                  className="fas fa-plus text-info"
                  style={{ float: 'right', color: 'red', marginLeft: '3px' }}
                />
              </button>
            </Link>
          </div>
        </div>
      );
    } else if (this.state.waitingForHeaderToken) {
      content = <Spinner />;
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
