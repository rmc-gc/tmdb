import React from 'react';
import { withRouter } from 'react-router-dom';

import './error-page.scss';
import errorImage from '../../error.jpeg';

const ErrorPage = props => {
  return (
    <div className="error-page">
      <img src={errorImage} alt="We've encountered an error" title="error" />

      <p>
        Well, this is embarrassing!
      </p>
      <p>
        Unfortunately the internet is late for work today.<br/>
        Could you please try later?
      </p>
    </div>
  );
}

export default withRouter(ErrorPage);
