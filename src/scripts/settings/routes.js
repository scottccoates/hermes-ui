/* jshint -W030 */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { Router, Route, Redirect } from 'react-router';

export default {
  init(container){
    const AppLayoutComponent = container.get("AppLayoutComponent").dependency;
    const DashboardComponent = container.get("DashboardComponent").dependency;

    const LoginComponent  = container.get("LoginComponent").dependency;
    const LogoutComponent = container.get("LogoutComponent").dependency;

    const CreateAgreementComponent          = container.get("AgreementNewCreateComponent").dependency;
    const AgreementEditContainerComponent   = container.get("AgreementEditContainerComponent").dependency;
    const AgreementDetailContainerComponent = container.get("AgreementDetailContainerComponent").dependency;

    const SearchResultContainer = container.get("SearchResultContainer").dependency;

    const SecurityPrivacyComponent = container.get("SecurityPrivacyComponent").dependency;

    const CheckoutComponent = container.get("CheckoutComponent").dependency;

    // http://rackt.github.io/history/stable/GettingStarted.html
    // react-router started using a new history dep: https://github.com/rackt/react-router/blob/master/CHANGELOG.md#v100-beta4---mon-31-aug-2015-061934-gmt
    const history = container.get("History");
    const store   = container.get("AppStore");

    function requireAuth(nextState, replaceState) {
      if (!store.getState().session.loggedIn) {
        replaceState({'next-path': nextState.location.pathname}, '/login');
      }
    }

    // routes should be defined in a constant outside of the actual component
    // https://github.com/reactjs/react-router/issues/2704#issuecomment-174363765
    const routes = (
      <Provider store={store}>
      <Router history={history}>
        <Route component={AppLayoutComponent} onEnter={requireAuth}>
          <Redirect from='/' to='/dashboard'/> {/*https://github.com/rackt/react-router/issues/1675*/}

          <Route path='dashboard' component={DashboardComponent}/>

          <Route path='privacy' component={SecurityPrivacyComponent}/>

          <Route path='checkout' component={CheckoutComponent}/>

          <Route path='agreements'>
            <Route path='step-1' component={CreateAgreementComponent}/>
            <Route path=':agreementId/step-2' component={AgreementEditContainerComponent}/>
            <Route path=':agreementId/edit' component={AgreementEditContainerComponent}/>
            <Route path=':agreementId' component={AgreementDetailContainerComponent}/>
          </Route>

          <Route path='search' component={SearchResultContainer}/>
        </Route>

        <Route path='login' component={LoginComponent}/>
        <Route path='logout' component={LogoutComponent}/>
      </Router>
    </Provider>
    );

    // https://github.com/capaj/systemjs-hot-reloader/issues/13
    // https://github.com/jackfranklin/interactive-es6/pull/3/commits
    class ForceReRender extends React.Component {

      componentWillMount() {
        // a little hack to help us rerender when this module is reloaded
        // https://github.com/capaj/jspm-react/blob/master/public/app.js#L16
        this.forceUpdate();
      }

      render() {
        return routes;
      }
    }

    ReactDOM.render(<ForceReRender />, document.getElementById('app'));
  }
};
