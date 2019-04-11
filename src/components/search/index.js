import React from 'react';
import PropTypes from 'prop-types';

import './search.scss';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchText: ''};

    // this.handleSubmit.bind(this);
  }

  /**
   * Change handler for the search text input value
   */
  handleChange = event => {
    this.setState({searchText: event.target.value});
  }

  /**
   * Submit handler for the search text input
   */
  handleSubmit = event => {
    event.preventDefault();

    // Don't search if nothing's been entered
    if (this.state.searchText.length === 0) {
      return;
    }

    // Call the search callback passed to us in the props
    this.props.searchCallback(this.state.searchText);

    // Reset the search text
    this.setState({searchText: ''});
  }

  render = () => {
    return (
      <form className="search" onSubmit={event => this.handleSubmit(event)}>
        <div className="form-group has-search">
          <span className="fa fa-search form-control-feedback" />
          <input type="text" className="form-control" value={this.state.searchText} onChange={this.handleChange} placeholder="Search" />
        </div>
      </form>
    );
  };
}

Search.propTypes = {
  searchCallback: PropTypes.func.isRequired,
};
