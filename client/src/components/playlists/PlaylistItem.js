import React, { Component } from 'react';
import SongItem from './SongItem';

class PlaylistItem extends Component {
  state = {
    showPlaylisttInfo: false
  };

  onDeleteClick = id => {
    //this.props.deleteSong(id);
  };

  render() {
    const { _id, title, description, songs } = this.props.playlist;
    const { showPlaylisttInfo } = this.state;

    return (
      <div className="card card-body mb-3">
        <h1>
          {title}
          <i
            onClick={() =>
              this.setState({
                showPlaylisttInfo: !this.state.showPlaylisttInfo
              })
            }
            className="fas fa-sort-down"
            style={{ cursor: 'pointer' }}
          />
          <i
            className="fas fa-times"
            style={{ cursor: 'pointer', float: 'right', color: 'red' }}
            onClick={this.onDeleteClick.bind(this, _id)}
          />
          {description && <p className="lead">{description}</p>}
        </h1>
        {showPlaylisttInfo ? (
          <ul className="list-group">
            {songs.map(song => (
              <SongItem key={song._id} song={song} />
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
}

export default PlaylistItem;
