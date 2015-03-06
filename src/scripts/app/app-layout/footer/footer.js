'use strict';

import React from 'react';

export default React.createClass({

  render: function () {
    return (
        <footer id="footer-wrapper">
          <ul>
            <li id="footer-secure-connection">
              <i className="fa fa-lock"></i>
              <span>Secure Connection</span>
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
