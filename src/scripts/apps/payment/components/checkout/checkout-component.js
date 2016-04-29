'use strict';

import React from 'react';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

import cx from 'classnames';

import { connect } from 'react-redux';

import StripeCheckout from 'react-stripe-checkout';

export default function (userActions, stripeApiKey) {

  let component = React.createClass({
    displayName: "CheckoutComponent",

    onToken(paymentToken){
      userActions.subscribeUser(this.props.user.id, paymentToken.id);
    },

    componentWillMount(){
      // we need to wait until render has finished before we can set focus to this as its currently hidden.
      setTimeout(()=> {
        if (this.refs.stripe) {
          this.refs.stripe.onClick();
        }
      });
    },

    render() {
      let checkoutNode = null;

      if (this.props.user.subscriptions.isSubscribed) {
        checkoutNode =
          <div>
            <div className="content-section  space-top space-bottom">
              <div className="container">
                <h1 className="page-header">Checkout Complete</h1>
              </div>
            </div>

            <div className="content-section space-bottom">
              <div className="container">
                <section className="row content-section-item space-top-sm">
                  <div className="col-md-24">
                    <p>
                      Your subscription is complete! Please send an email to <a className="underline"
                                                                                href="mailto:support@startwillow.com"
                                                                                target="_blank">support@startwillow.com</a>
                      &nbsp; if you'd like to
                      cancel.
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>;
      }
      else {
        checkoutNode = <StripeCheckout ref="stripe" token={this.onToken} stripeKey={stripeApiKey}
                                       amount={2999}
                                       email={this.props.user.identity.email}
                                       name='Willow'
                                       image='/assets/images/medium-logo-no-text.svg'>
          <span>{/*we don't want to display any button - just auto popup*/}</span>
        </StripeCheckout>;
      }

      return (
        <div className="checkout-wrapper">
          {checkoutNode}
        </div>
      );
    }
  });

  function extracted(state) {
    return {
      user: state.userInfo
    };
  }

  component = connect(extracted)(component);

  return new DependencyProvider(component);
};
