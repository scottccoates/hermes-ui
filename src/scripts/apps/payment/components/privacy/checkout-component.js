'use strict';

import React from 'react';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

import cx from 'classnames';

import StripeCheckout from 'react-stripe-checkout';

export default function (stripeApiKey) {

  const component = React.createClass({
    displayName: "CheckoutComponent",

    onToken(token){
      console.log("token", token);
    },

    render() {

      return (
        <div className="checkout-wrapper">
          <StripeCheckout token={this.onToken} stripeKey={stripeApiKey}
                          amount={2999}
                          name='Willow'
                          image='/assets/images/medium-logo-no-text.svg'/>
        </div>
      );
    }
  });

  return new DependencyProvider(component);
};
