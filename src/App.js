import React from 'react';
import { Switch, Route , withRouter} from 'react-router-dom';

import { fetchAPIConfig, discoverPopularFilms, searchForFilms } from './utils/api';
import ErrorPage from './components/error-page';
import FilmPage from './components/film-page';
import HomePage from './components/home-page';
import Loader from './components/loader';

class App extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      busy: true,
    };
  }

  componentDidMount = async () => {
    try {
      // Fetch the API config
      let config = await fetchAPIConfig();
      this.setState({
        apiConfig: config,
      });

      // Fetch the most popular films for initial display
      let films = await discoverPopularFilms();
      this.setState({
        filmList: films.results,
      });
    }
    catch {
      // If we can't load the API config, not much we CAN do
      // ¯\_(ツ)_/¯ 
      this.props.history.push('/error');
    }
    finally {
      this.setState({
        busy: false,
      });
    }
  }

  /**
   * @description
   * Fetch a list of films based on a search string
   */
  search = async searchText => {
    // And we're off - Look busy!
    this.setState({
      busy: true,
    });

    try {
      // Fetch the most popular films for initial display
      let films = await searchForFilms(searchText);

      this.setState({
        filmList: films.results,
        search: true,
      });
    }
    catch {
      // Hit an error fetching the film list
      // TODO: For now, goto the error page, but we could probably just show a message here and carry on
      this.props.history.push('/error');
    }
    finally {
      this.setState({
        busy: false,
      });
    }
  }

  render = () => {
    // Show a busy icon while we're performing the initial config/data load
    if (this.state.busy) {
      return (<Loader />); 
    }

    return (
      <Switch>
        <Route exact path="/" render={props => <HomePage apiConfig={this.state.apiConfig} films={this.state.filmList} title={this.state.search ? 'Search Results' : undefined} searchCallback={this.search} {...this.props} />} />
        <Route exact path="/film/:id" render={props => <FilmPage apiConfig={this.state.apiConfig} {...this.props} />} />
        <Route exact path="/error" render={props => <ErrorPage {...this.props} />} />
      </Switch>
    );
  }
}

export default withRouter(App);
