import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchSong } from '../../actions/songActions';
import Spinner from '../common/Spinner';
import YouTubePlayer from 'youtube-player';
import isEmpty from '../../validation/is-empty';
import AddToPlaylist from './AddToPlaylist';

class Song extends Component {
  constructor() {
    super();
    this.state = {
      song: null,
      loading: null,
      error: false
    };
  }

  componentDidMount() {
    this.props.searchSong(this.props.match.params.search.replace(/\+/g, ' '));
  }

  componentWillReceiveProps(newProps) {
    if (newProps.song.song && !newProps.song.loading) {
      this.setState({
        song: newProps.song.song,
        loading: newProps.song.loading
      });
    }

    if (newProps.song.loading) {
      this.setState({
        loading: newProps.song.loading
      });
    }

    if (newProps.errors) {
      this.setState({ error: newProps.errors.error });
    }
  }

  render() {
    const { song, loading, error } = this.state;
    let songContent;

    if (error) {
      songContent = (
        <div className="container">
          <h1 className="text-center">Tab not found</h1>
          <h3 className="text-center">Please, modify your search</h3>
        </div>
      );
    } else if (song === null || loading || Object.keys(song).length === 0) {
      songContent = <Spinner />;
    } else if (document.getElementById('yt-player')) {
      YouTubePlayer('yt-player', {
        videoId: song.ytID,
        height: 150
      });

      const tabRaw = song.tab.content.text;

      if (song.tab.type === 'Chords') {
        // Split tab in two columns
        let linesAmount = (tabRaw.match(/\n/g) || []).length;

        let col1 = tabRaw
          .split('\n')
          .slice(0, linesAmount / 2 + 1)
          .join('\n');
        let col2 = tabRaw
          .split('\n')
          .slice(-linesAmount / 2 - (linesAmount % 2 !== 0 ? 1 : 0)) // One more line if odd
          .join('\n');

        // If the last line in col1 is chords, add its corresponding lyrics below from col2
        /*
      if (col1.slice(-col1.lastIndexOf('\n')).includes('[ch]')) {
        // Remove first line from col2
        const removedLine = '\n' + col2.slice(0, col2.indexOf('\n'));
        col1 += removedLine;
      }*/

        const col1NoChTag = col1
          .replace(/\[ch\]/g, '')
          .replace(/\[\/ch\]/g, '');
        const col2NoChTag = col2
          .replace(/\[ch\]/g, '')
          .replace(/\[\/ch\]/g, '');

        songContent = (
          <div
            className="row"
            style={{ whiteSpace: 'pre-wrap', fontFamily: 'Roboto Mono' }}
          >
            <div className="col-lg-6" style={{ whiteSpace: 'pre-wrap' }}>
              {col1NoChTag}
            </div>
            <div className="col-lg-6" style={{ whiteSpace: 'pre-wrap' }}>
              {col2NoChTag}
            </div>
          </div>
        );
      } else {
        // song.tab.type === 'Tab' => no column splitting and font is 'Roboto Mono' to match UG's tab
        const tabNoChTag = tabRaw
          .replace(/\[ch\]/g, '')
          .replace(/\[\/ch\]/g, '');
        songContent = (
          <div
            className="container"
            style={{ whiteSpace: 'pre-wrap', fontFamily: 'Roboto Mono' }}
          >
            {tabNoChTag}
          </div>
        );
      }
    }

    return (
      <div className="container-fluid">
        <div className="row mb-2">
          <div id="yt-player" className="col-md-3" />
          <div id="title-artist" className="col-md-6">
            {!isEmpty(this.state.song) && (
              <React.Fragment>
                <h1 className="text-center">{this.state.song.tab.name}</h1>
                <h3 className="text-center">{this.state.song.tab.artist}</h3>
              </React.Fragment>
            )}
          </div>
          <div id="right-side" className="col-md-3">
            {!isEmpty(this.state.song) && <AddToPlaylist />}
          </div>
        </div>

        {songContent}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  song: state.song,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { searchSong }
)(Song);
