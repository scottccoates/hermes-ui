import { Flux } from 'flummox';


export default {
  init (container) {

    const agreementListStore   = container.get("AgreementListStore").dependency;
    const agreementDetailStore = container.get("AgreementDetailStore").dependency;
    const agreementActions     = container.get("AgreementActions");

    const reactJsActions = container.get("ReactJsActions");

    const sessionActions = container.get("SessionActions");
    const sessionStore   = container.get("SessionStore").dependency;

    const loadingFeedbackStore = container.get("LoadingFeedbackStore").dependency;

    return class AppFlux extends Flux {

      constructor() {
        super();

        // follow the format (above)
        // import X ===== import x
        this.createActions('AgreementActions', agreementActions);

        this.createActions('ReactJsActions', reactJsActions);

        this.createActions('SessionActions', sessionActions);

        // The extra argument(s) are passed to the XYZStore constructor
        this.createStore('AgreementListStore', agreementListStore, this);
        this.createStore('AgreementDetailStore', agreementDetailStore, this);

        this.createStore('LoadingFeedbackStore', loadingFeedbackStore, this);

        this.createStore('SessionStore', sessionStore, this);
      }
    }
  }
};
