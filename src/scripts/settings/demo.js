import config from 'src/scripts/settings/ioc';

import FakeLoginComponent from 'src/scripts/apps/session/comonents/fake-login';
import FakeTokenService from 'src/scripts/apps/session/services/fake-token-service';
import FakeAuthService from 'src/scripts/apps/session/services/fake-auth-service';

import NoOpDropzone from 'src/scripts/libs/file-upload/no-op-dropzone';

import ClientSidePersistenceApiService from 'src/scripts/apps/api/persistence/client-side/services/client-side-persistence-api-service';
import ClientSideRetrievalApiService from 'src/scripts/apps/api/retrieval/client-side/services/client-side-retrieval-api-service';

export default {
  init(){
    const container = config.init();
    container.register("TokenService", FakeTokenService);
    container.register("LoginComponent", FakeLoginComponent);
    container.register("AuthService", FakeAuthService);

    container.register("Dropzone", NoOpDropzone);

    container.register("PersistenceApiService", ClientSidePersistenceApiService);
    container.register("RetrievalApiService", ClientSideRetrievalApiService);

    FakeLoginComponent.$inject = ["TokenService"];

    return container;
  }
}
