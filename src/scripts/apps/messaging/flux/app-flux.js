import { Flux } from 'flummox';

import container from '../../../settings/di';

const managementItemStore   = container.get("ActivityListStore").dependency;
const managementItemActions = container.get("ManagementItemActions");

const reactJsActions = container.get("ReactJsActions");

const loadingFeedbackStore = container.get("LoadingFeedbackStore").dependency;


export default class AppFlux extends Flux {

  constructor() {
    super();

    this.createActions('managementItemActions', managementItemActions);

    this.createActions('reactJsActions', reactJsActions);

    // The extra argument(s) are passed to the MessageStore constructor
    this.createStore('managementItemStore', managementItemStore, this);

    this.createStore('loadingFeedbackStore', loadingFeedbackStore, this);
  }
};
