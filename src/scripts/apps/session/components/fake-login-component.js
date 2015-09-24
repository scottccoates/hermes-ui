import React from 'react';

import { Navigation } from 'react-router';

import { connect } from 'react-redux';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

import Validation from 'rc-form-validation';

import log from 'loglevel';

const {Validator} = Validation;

export default function (sessionActions, tokenService) {

  var login = React.createClass({
    displayName: "FakeLogin",
    mixins: [
      Validation.FieldMixin,
      Navigation
    ],

    contextTypes: {
      router: React.PropTypes.object
    },

    getInitialState() {
      return {
        status: {
          username: {},
          password: {}
        },
        formData: {
          username: "",
          password: ""
        }
      };
    },
    componentWillReceiveProps(nextProps){
      if (nextProps.loggedIn) {
        this.transitionTo(this.props.location.query.nextPath || 'dashboard');
      }
    },
    onSubmit(event){
      event.preventDefault();
      var validation = this.refs.validation;

      const props = this.props;

      // it's important to remember that validation is async (consider database calls, apis, existence in db, etc).
      validation.validate(valid => {
        if (valid) {
          const tokenData = tokenService.getTokenData(this.state.formData);

          try {
            log.info("Beginning: Log in user: %s", tokenData.profile.username);
            props.login(tokenData.idToken, tokenData.profile, props.resumeSession);
            log.info("Completed: Log in user: %s", tokenData.profile.username);
          }
          catch (e) {
            throw new Error("Error completing the login process " + e.stack);
          }
        }
      });
    },

    render() {
      const formData = this.state.formData;
      const status   = this.state.status;

      return (
        <div id="login-wrapper">

          <div className="content-section  space-top space-bottom">
            <div className="container">
              <h1 className="page-header">Login</h1>
            </div>
          </div>

          <div className="content-section  space-bottom">
            <div className="container">
              <form className="form-horizontal agreement-form-data-entry" onSubmit={this.onSubmit}>
                <Validation ref='validation' onValidate={this.handleValidate}>
                  <section className="row content-section-item space-bottom-xl">
                    <div className="space-top-sm col-md-24">

                      <div className="form-group content-section-item">
                        <label htmlFor="login-username" className="col-sm-6 control-label">Username</label>

                        <div className="col-sm-18">
                          <Validator rules={{required:true, message: 'Username required.'}} value={formData.username}>
                            <input type="text" name="username" className="form-control" id="login-username"
                                   value={formData.username}/>
                          </Validator>
                          {status.username.errors ? <span> {status.username.errors.join(', ')}</span> : null}
                        </div>
                      </div>
                      <div className="form-group content-section-item">
                        <label htmlFor="login-password" className="col-sm-6 control-label">Password</label>

                        <div className="col-sm-18">
                          <Validator rules={{required:true, message: 'Password required.'}} value={formData.password}>
                            <input type="password" name="password" className="form-control" id="login-password"
                                   value={formData.password}/>
                          </Validator>
                          {status.password.errors ? <span> {status.password.errors.join(', ')}</span> : null}
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="row agreement-form-section agreement-form-section-save content-section-item">
                    <div className="col-md-24">
                      <button type='submit' className="btn btn-default">Login
                      </button>
                    </div>
                  </section>
                </Validation>
              </form>
            </div>
          </div>
        </div>
      );
    }
  });

  login = connect(x=> x.session, sessionActions)(login);

  return new DependencyProvider(login);
};
