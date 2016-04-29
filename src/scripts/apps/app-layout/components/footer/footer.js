'use strict';

import React from 'react';

import {Link}  from 'react-router';

export default React.createClass({

  render() {
    return (
      <footer id="footer-wrapper">
        <ul>
          <li id="footer-secure-connection">
            <Link to='/privacy'>
              <i className="fa fa-lock"></i>
              <span>Secure Connection</span>
            </Link>
          </li>
          <li>
            <Link to='/support'>
              Support
            </Link>
          </li>
          <li>
            <a href='https://angel.co/willow-1' target="_blank">About</a>
          </li>
          <li>
            <Link to='/privacy'>
              Privacy
            </Link>
          </li>
          <li>
            <Link to='/privacy'>
              Terms
            </Link>
          </li>
          <li className="social">
            <a href="https://twitter.com/startwillow" target="_blank">
              <i className="fa fa-twitter"/>
            </a>
          </li>
          <li className="social">
            <a href="https://www.facebook.com/startwillow" target="_blank">
              <i className="fa fa-facebook"/>
            </a>
          </li>
          <li id="footer-copyright">
            <span>© 2016 Willow, Inc.</span>
          </li>
        </ul>
      </footer>
    );
  }
});
