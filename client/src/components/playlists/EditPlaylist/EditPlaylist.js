import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPlaylist, editPlaylist } from '../../../actions/playlistsActions';
import Spinner from '../../common/Spinner';
import isEmpty from '../../../validation/is-empty';
import TextFieldGroup from '../../common/TextFieldGroup';
import SongInputs from '../CreatePlaylist/SongInputs';

class EditPlaylist extends Component {
  state = {
    title: '',
    description: '',
    songs: [],
    errors: {},
    loading: false
  };

  componentDidMount() {
    const { playlistID } = this.props.match.params;
    this.props.getPlaylist(playlistID);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.playlists.playlist) {
      const { title, description, songs } = newProps.playlists.playlist;
      const { loading } = newProps.playlists;
      this.setState({ title, description, songs, loading });
    }

    if (newProps.playlists.loading) {
      this.setState({ loading: newProps.playlists.loading });
    }

    if (newProps.errors.error) {
      this.setState({ errors: newProps.errors.error });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    let editedPlaylist = {
      _id: this.props.match.params.playlistID,
      title: this.state.title,
      description: this.state.description,
      songs: this.state.songs
    };

    // Remove incorrect songs (no title and/or artist)
    editedPlaylist.songs = editedPlaylist.songs.filter(
      song => song.title !== '' && song.artist !== ''
    );

    this.props.editPlaylist(editedPlaylist, this.props.history);

    // Clear State
    this.setState({
      title: '',
      description: '',
      songs: [],
      errors: {}
    });
  };

  onChange = (i, e) => {
    if (i !== null) {
      // SongInputs component
      let songs = [...this.state.songs];
      songs[i][e.target.name] = e.target.value;
      this.setState({ songs });
    } else this.setState({ [e.target.name]: e.target.value });
  };

  addSongInput = e => {
    this.setState({
      songs: [...this.state.songs, { title: '', artist: '' }]
    });
  };

  onDeleteClick = (i, e) => {
    // Remove element in index i
    const songs = [...this.state.songs];
    songs.splice(i, 1);
    this.setState({
      songs
    });
  };

  render() {
    let content;

    if (this.state.loading && isEmpty(this.state.errors)) {
      content = <Spinner />;
    } else {
      const { title, description, songs, errors } = this.state;

      content = (
        <div className="card mb-3">
          <div className="card-header text-center h1">Edit playlist</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                label="Title"
                name="title"
                placeholder="Enter title"
                value={title}
                onChange={this.onChange.bind(this, null)}
                error={errors.title}
              />
              <TextFieldGroup
                label="Description"
                name="description"
                placeholder="Enter description"
                value={description}
                onChange={this.onChange.bind(this, null)}
                error={errors.description}
              />
              <SongInputs
                songs={songs}
                onChange={this.onChange}
                onDeleteClick={this.onDeleteClick}
              />
              <button
                onClick={this.addSongInput}
                className="btn btn-outline-info mb-3"
                type="button"
              >
                Add new song
              </button>
              <input
                type="submit"
                value="Edit playlist"
                className="btn btn-info btn-block btn-lg"
              />
            </form>
          </div>
        </div>
      );
    }

    return content;
  }
}

const mapStateToProps = state => ({
  playlists: state.playlists,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getPlaylist, editPlaylist }
)(withRouter(EditPlaylist));
