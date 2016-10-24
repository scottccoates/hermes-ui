// This doesn't need to be a react component, it never really renders anything.
// However, we might want to show some type of logout page or something?
import React from 'react';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

import { connect } from 'react-redux';

export default function (sessionActions) {
  var logout = React.createClass({
    displayName: "LogoutComponent",

    _doLoginTransition(){
      window.location = 'login';
    },

    componentWillMount(){
      if (this.props.loggedIn) {
        sessionActions.logout();
      }
      else {
        this._doLoginTransition();
      }
    },

    componentWillReceiveProps(nextProps){
      // this isn't called when visiting the '/logout' page directly. This is probably because the store is already
      // done initializing by the time we get here.

      // however, this is called when we invoke sessionActions.logout (because this will update sessionStore)
      this._doLoginTransition();
    },

    render() {
      return (
        <div id="logout-wrapper"></div>
      );
    }
  });

  logout = connect(x=>x.session)(logout);
  return new DependencyProvider(logout);
};
