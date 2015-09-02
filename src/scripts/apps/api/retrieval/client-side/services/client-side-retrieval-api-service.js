import log from 'loglevel';
import agreementRetrievalApiService from './agreement-client-side-retrieval-api-service';

export default function () {
  return {
    init(store) {

      //agreementRetrievalApiService.init(store);

      return Promise.resolve(); // callers expect this method to be async (in case hooking up to firebse, for example)
    }
  }
};
