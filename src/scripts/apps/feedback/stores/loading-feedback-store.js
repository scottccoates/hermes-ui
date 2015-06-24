import { Store } from 'flummox';

import Bacon from 'bacon';

import Immutable from 'immutable';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

export default function () {
  const startStream  = new Bacon.Bus();
  const doneStream   = new Bacon.Bus();
  const actionStream = startStream.map(1)
    .merge(doneStream.map(-1))
    .scan(0, (acc, actionValue)=> acc + actionValue);
  const onStream     = actionStream.filter(val => val === 1);
  const offStream    = actionStream.filter(val => val === 0);

  class LoadingFeedbackStore extends Store {

    constructor(flux) {
      super();

      const reactJsActions = flux.getActionIds('reactJsActions');
      this.registerAsync(reactJsActions.performAsyncAction, this.onPerformAsyncAction, this.onPerformAsyncActionCompleted, this.onPerformAsyncActionCompleted);

      //noinspection JSUnnecessarySemicolon
      //noinspection BadExpressionStatementJS
      onStream.subscribe(::this.on);
      //noinspection BadExpressionStatementJS
      offStream.subscribe(::this.off);

      this.state = {
        asyncActionBeingPerformed: false
      };
    }

    onPerformAsyncAction() {
      startStream.push()
    }

    onPerformAsyncActionCompleted() {
      doneStream.push()
    }

    onPerformAsyncActionFailed() {
      doneStream.push()
    }

    on() {
      this.setState({asyncActionBeingPerformed: true});
    }

    off() {
      this.setState({asyncActionBeingPerformed: false});
    }
  }

  return new DependencyProvider(LoadingFeedbackStore);
}
