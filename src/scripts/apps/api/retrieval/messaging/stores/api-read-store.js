import { Store } from 'flummox';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

import log from 'loglevel';

export default function () {
  class ApiReadStore extends Store {

    constructor() {
      super();

      this.state = {
        readApiReady: false
      };
    }

    setReadApiReadyState(state) {
      this.setState({readApiReady: state});
    }
  }

  return new DependencyProvider(ApiReadStore);
}
