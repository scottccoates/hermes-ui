import log from 'loglevel';
import agreementRetrievalRepo from './agreement-client-side-retrieval-api-service';

export default function () {
  return {
    init(appFlux) {

      agreementRetrievalRepo.init(appFlux);

      return Promise.resolve(); // callers expect this method to be async (in case hooking up to firebse, for example)
    }
  }
};
