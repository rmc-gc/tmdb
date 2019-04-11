import React from 'react';
import { withRouter } from 'react-router-dom';

import Loader from '../loader';
import { fetchFilm } from '../../utils/api';

import './film-page.scss';
import noImage from '../../no_image.png';

class FilmPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      busy: true,
    }
    this.id = this.props.match.params.id;
    this.backdropPath = this.props.apiConfig.images.secure_base_url + this.props.apiConfig.images.backdrop_sizes[1];
    this.posterPath = this.props.apiConfig.images.secure_base_url + this.props.apiConfig.images.poster_sizes[1];
  }

  componentDidMount = async () => {
    try {
      // Fetch the movie details
      let film = await fetchFilm(this.id);
      this.setState({
        film
      });
    }
    catch {
      // Don't goto the error page
      // Catch this use-case in the render and display an appropriate message
    }
    finally {
      // Reset busy state
      this.setState({
        busy: false,
      });      
    }
  }

  /**
   * @description
   * Return to the previous page
   */
  goBack = () => {
    this.props.history.goBack();
  }

  prettyRuntime = runtime => {
    let hrs = Math.floor(runtime / 60);
    let mins = runtime % 60;

    if (mins > 0) {
      return `${hrs}h ${mins} min`;
    }
    return `${hrs}h`;
  }

  render = () => {
    // If we're busy show the loader
    if (this.state.busy) {
      return (<Loader />);
    }

    // No film to display?
    if (!this.state.film) {
      return (
        <div className="no-film">Sorry - We could not load this film</div>
      );
    }

    let backdropStyle = {
      backgroundImage: 'url(' + this.backdropPath + this.state.film.backdrop_path + ')'
    };

    return (
      <div className="film">
        <div className="backdrop" style={backdropStyle} />
        <i className="fa fa-arrow-left" onClick={this.goBack} />

        <div className="film-container">
          { /* Do we have a poster? */ }
          { !this.state.film.poster_path &&
            <img src={noImage}
            alt={this.state.film.title}
            title={this.state.film.title} />
          }
          { this.state.film.poster_path &&
            <img src={this.posterPath + this.state.film.poster_path}
            alt={this.state.film.title}
            title={this.state.film.title} />
          }
          <div className="film-header">
            <div className="film-title">{this.state.film.title}</div>
            <div className="release-date">{new Date(this.state.film.release_date).getFullYear()} &nbsp; • &nbsp; {this.state.film.vote_average * 10}% User Score</div>
            <div className="release-date">{this.prettyRuntime(this.state.film.runtime)}</div>
          </div>
          <div className="divider" />

          <div className="overview-title">Overview</div>
          <div className="overview-text">{this.state.film.overview}</div>
          </div>
      </div>
    );
  };
}

export default withRouter(FilmPage);
