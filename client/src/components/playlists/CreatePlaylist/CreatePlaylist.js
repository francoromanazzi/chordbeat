import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { createPlaylist } from '../../../actions/playlistsActions';
import { connect } from 'react-redux';
import TextFieldGroup from '../../common/TextFieldGroup';
import SongInputs from './SongInputs';

class CreatePlaylist extends Component {
  state = {
    title: '',
    description: '',
    songs: [],
    errors: {}
  };

  componentWillReceiveProps(newProps) {
    if (newProps.errors.error) {
      this.setState({ errors: newProps.errors.error });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    let newPlaylist = {
      title: this.state.title,
      description: this.state.description,
      songs: this.state.songs
    };

    // Remove incorrect songs (no title and/or artist)
    newPlaylist.songs = newPlaylist.songs.filter(
      song => song.title !== '' && song.artist !== ''
    );

    this.props.createPlaylist(newPlaylist, this.props.history);

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
    const { title, description, songs, errors } = this.state;

    return (
      <div className="card mb-3">
        <div className="card-header text-center h1">Create new playlist</div>
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
              value="Create playlist"
              className="btn btn-info btn-block btn-lg"
            />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createPlaylist }
)(withRouter(CreatePlaylist));
