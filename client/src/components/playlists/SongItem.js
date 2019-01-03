import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SongItem extends Component {
  render() {
    const { title, artist } = this.props.song;
    const search = `/song/${title} - ${artist}`.replace(/ /g, '+');
    return (
      <Link to={search} style={{ textDecoration: 'none' }}>
        <li className="list-group-item">
          <strong>{title}</strong> - {artist}
        </li>
      </Link>
    );
  }
}

export default SongItem;
