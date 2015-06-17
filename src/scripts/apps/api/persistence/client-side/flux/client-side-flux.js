import { Flux } from 'flummox';

import Actions from './../actions/actions';

import ManagementItemStore from '../stores/management-item-test-store';

export default class AppFlux extends Flux {

  constructor() {
    super();

    this.createActions('clientSide', Actions);

    // The extra argument(s) are passed to the MessageStore constructor
    this.createStore('managementItem', ManagementItemStore, this);
  }
};
