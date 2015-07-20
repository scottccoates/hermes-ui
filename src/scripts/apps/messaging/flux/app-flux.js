import { Flux } from 'flummox';


export default {
  init (container) {

    const agreementStore   = container.get("AgreementStore").dependency;
    const agreementActions = container.get("AgreementActions");

    const reactJsActions = container.get("ReactJsActions");

    const sessionActions = container.get("SessionActions");
    const sessionStore   = container.get("SessionStore").dependency;

    const loadingFeedbackStore = container.get("LoadingFeedbackStore").dependency;

    return class AppFlux extends Flux {

      constructor() {
        super();

        // follow the format (above)
        // import X ===== import x
        this.createActions('agreementActions', agreementActions);

        this.createActions('reactJsActions', reactJsActions);

        this.createActions('sessionActions', sessionActions);
        window.s = this.getActions('sessionActions');

        // The extra argument(s) are passed to the MessageStore constructor
        this.createStore('agreementStore', agreementStore, this);

        this.createStore('loadingFeedbackStore', loadingFeedbackStore, this);

        this.createStore('sessionStore', sessionStore, this);
      }
    }
  }
};
