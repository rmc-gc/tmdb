import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import FilmList from '../film-list';
import Search from '../search';

import logo from '../../tmdb-logo.svg';
import './home-page.scss';

const HomePage = props => {
  // Default a title if we haven't been passed it
  let title = (props.title ? props.title : 'Popular Movies');

  return (
    <div className="home-page">
      <img src={logo} className="app-logo" alt="logo" />
      <Search searchCallback={props.searchCallback} />
      <div className="list-title">{title}</div>

      <FilmList apiConfig={props.apiConfig} films={props.films} />
    </div>
  );
}

HomePage.propTypes = {
  apiConfig: PropTypes.object.isRequired,
  title: PropTypes.string,
  films: PropTypes.array.isRequired,
  searchCallback: PropTypes.func.isRequired,
};

export default withRouter(HomePage);
