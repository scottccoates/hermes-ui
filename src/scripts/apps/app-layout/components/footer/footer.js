'use strict';

import React from 'react';

import {Link}  from 'react-router';

export default React.createClass({

  render() {
    return (
      <footer id="footer-wrapper">
        <ul>
          <li id="footer-secure-connection">
            <Link to='privacy'>
              <i className="fa fa-lock"></i>
              <span>Secure Connection</span>
            </Link>
          </li>
          <li>
            <span>Support</span>
          </li>
          <li>
            <span>About</span>
          </li>
          <li>
            <span>Privacy</span>
          </li>
          <li>
            <span>Terms</span>
          </li>
          <li>
            <span>Support</span>
          </li>
          <li className="social">
            <i className="fa fa-twitter"/>
          </li>
          <li className="social">
            <i className="fa fa-facebook"/>
          </li>
          <li id="footer-copyright">
            <span>© 2015 Willow, Inc.</span>
          </li>
        </ul>
      </footer>
    );
  }
});
