import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './film-list.scss';
import noImage from '../../no_image.png';

class FilmList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imagePath: undefined
    };
  }

  componentDidMount = () => {
    this.setState( {
      imagePath: this.props.apiConfig.images.secure_base_url + this.props.apiConfig.images.poster_sizes[1],
    });
  }

  /**
   * @description
   * Extract the month (as a word) and the full year from the passed date
   * @returns a string in the format "April 2019"
   */
  formatDate = filmDate => {
    // Empty date?
    if (!filmDate || filmDate.length === 0) {
      return '';
    }

    const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    let date = new Date(filmDate);
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    return `${month} ${year}`;
  }

  /**
   * @description
   * Handle when a film is selected
   */
  onFilmClick = film => {
    this.props.history.push(`/film/${film.id}`);
  }

  /**
   * @description
   * Get the rating class based on its score
   */
  getRatingClass = rating => {
    if (rating > 7)
      return 'film-rating film-rating--good';
    else if (rating > 4) 
      return 'film-rating film-rating--fair';
    else
      return 'film-rating film-rating--bad';
  }

  render = () => {
    // No image path yet, then bail
    if (!this.state.imagePath) {
      return <></>;
    }

    // Empty film list?
    if (!this.props.films || this.props.films.length === 0) {
      return (
        <div className="no-films">
          <br/>
          Nothing to see here.<br/>
          Movie along ...!
        </div>
      );
    }

    return (
      <div className="film-list">
        <div className="row">
          { this.props.films.map(film => {
              return (
                <div className="column" key={film.id}>
                  <div className="image-container">
                    { !film.poster_path &&
                        <>
                        <img src={noImage}
                          onClick={() => this.onFilmClick(film)}
                          alt={film.title}
                          title={film.title} />
                        <div className={this.getRatingClass(film.vote_average)}>{film.vote_average * 10}%</div>
                      </>                  
                    }
                    { film.poster_path &&
                      <>
                        <img src={this.state.imagePath + film.poster_path}
                          onClick={() => this.onFilmClick(film)}
                          alt={film.title}
                          title={film.title} />
                        <div className={this.getRatingClass(film.vote_average)}>{film.vote_average * 10}%</div>
                      </>
                    }
                  </div>
                  <div className="film-title">{film.title}</div>
                  <div className="release-date">{this.formatDate(film.release_date)}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  };
}

FilmList.propTypes = {
  apiConfig: PropTypes.object.isRequired,
  films: PropTypes.array.isRequired,
};

export default withRouter(FilmList);
