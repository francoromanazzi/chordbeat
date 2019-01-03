import React from 'react';
import TextFieldGroupSmall from '../../common/TextFieldGroupSmall';

const SongInputs = props => {
  return props.songs.map((song, i) => {
    return (
      <div key={i} className="form-row">
        <div className="col-md-6">
          <TextFieldGroupSmall
            label="Title"
            name="title"
            placeholder="Enter title"
            value={props.songs[i].title}
            onChange={props.onChange.bind(this, i)}
          />
        </div>
        <div className="col-md-5">
          <TextFieldGroupSmall
            label="Artist"
            name="artist"
            placeholder="Enter artist"
            value={props.songs[i].artist}
            onChange={props.onChange.bind(this, i)}
          />
        </div>
        <div className="col-md-1">
          <i
            className="fas fa-times h3"
            style={{ cursor: 'pointer', float: 'right', color: 'red' }}
            onClick={props.onDeleteClick.bind(this, i)}
          />
        </div>
      </div>
    );
  });
};

export default SongInputs;
