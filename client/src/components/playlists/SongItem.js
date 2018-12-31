import React, { Component } from 'react';

class SongItem extends Component {
  onDeleteClick = id => {
    //this.props.deleteSong(id);
  };

  render() {
    const { _id, title, artist } = this.props.song;
    return (
      <li className="list-group-item">
        <strong>{title}</strong> - {artist}
        <i
          className="fas fa-times"
          style={{ cursor: 'pointer', float: 'right', color: 'red' }}
          onClick={this.onDeleteClick.bind(this, _id)}
        />
      </li>
    );
  }
}

export default SongItem;
