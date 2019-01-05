import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import { clearSong } from '../../actions/songActions';

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    };
  }

  onSubmit = e => {
    e.preventDefault();
    if (this.state.search.trim() === '') {
      this.setState({ search: '' });
      return;
    }

    this.props.clearSong();

    const searchUrl = this.state.search.replace(/ /g, '+');
    this.props.history.push(`/song/${searchUrl}`);

    this.setState({ search: '' });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Chordbeat</h1>
                <p className="lead"> Get chords for your favorite songs</p>
                <hr style={{ marginBottom: '80px' }} />
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    name="search"
                    placeholder="Search a song by title and artist"
                    value={this.state.search}
                    onChange={this.onChange}
                  />
                  <input
                    type="submit"
                    value="Search"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { clearSong }
)(withRouter(Landing));
