/* jshint -W030 */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { Router, Route, Redirect } from 'react-router';
import { createHistory } from 'history';

export default {
  init(container){
    const AppLayoutComponent = container.get("AppLayoutComponent").dependency;
    const DashboardComponent = container.get("DashboardComponent").dependency;

    const LoginComponent  = container.get("LoginComponent").dependency;
    const LogoutComponent = container.get("LogoutComponent").dependency;

    const CreateAgreementComponent = container.get("CreateAgreementComponent").dependency;
    const AgreementFormComponent   = container.get("AgreementFormComponent").dependency;
    //const AgreementDetailContainerComponent = container.get("AgreementDetailContainerComponent").dependency;

    //const SearchResultContainer = container.get("SearchResultContainer").dependency;

    // http://rackt.github.io/history/stable/GettingStarted.html
    // react-router started using a new history dep: https://github.com/rackt/react-router/blob/master/CHANGELOG.md#v100-beta4---mon-31-aug-2015-061934-gmt
    const history = createHistory();
    const store   = container.get("AppStore");

    //var routes = (
    //  <Route handler={App}>
    //
    //    <Route path="/" name="appLayout" handler={AppLayoutComponent}>
    //      <Redirect from="/" to="dashboard"/>
    //
    //      <Route name="contracts">
    //        <Route name="createAgreement" path="step_1" handler={CreateAgreementComponent}/>
    //        <Route name="agreementForm" path="step_2" handler={AgreementFormComponent}/>
    //
    //        <Route name="agreementDetail" path=":agreementId" handler={AgreementDetailContainerComponent}/>
    //      </Route>
    //
    //      <Route name="dashboard" handler={DashboardComponent}/>
    //      <Route name="search" handler={SearchResultContainer}/>
    //    </Route>
    //
    //    <Route name="login" handler={LoginComponent}/>
    //    <Route name="logout" handler={LogoutComponent}/>
    //  </Route>
    //);

    function requireAuth(nextState, redirectTo) {
      if (!store.getState().session.loggedIn)
        redirectTo('/login', null, {'next-path': nextState.location.pathname});
    }

    ReactDOM.render((

      <Provider store={store}>
        <Router history={history}>
          <Route component={AppLayoutComponent} onEnter={requireAuth}>
            <Redirect from='/' to='/dashboard'/> // https://github.com/rackt/react-router/issues/1675
            <Route path='dashboard' component={DashboardComponent}/>

            <Route path='contracts'>
              <Route path='step-1' component={CreateAgreementComponent}/>
              <Route path=':id/step-2' component={AgreementFormComponent}/>
            </Route>
          </Route>

          <Route path='login' component={LoginComponent}/>
          <Route path='logout' component={LogoutComponent}/>
        </Router>
      </Provider>

    ), document.getElementById('app'));
  }
};
