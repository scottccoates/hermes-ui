import config from 'src/scripts/settings/ioc';

import FakeLoginComponent from 'src/scripts/apps/session/comonents/fake-login';
import FakeTokenService from 'src/scripts/apps/session/services/fake-token-service';
import FakeAuthService from 'src/scripts/apps/session/services/fake-auth-service';

import NoOpDropzone from 'src/scripts/libs/file-upload/no-op-dropzone';

import ClientSideApi from 'src/scripts/apps/api/services/client-side-api';
import ClientSideRetrievalRepository from 'src/scripts/apps/api/retrieval/client-side/repositories/client-side-retrieval-repository';

export default {
  init(){
    const container = config.init();
    container.register("TokenService", FakeTokenService);
    container.register("LoginComponent", FakeLoginComponent);
    container.register("AuthService", FakeAuthService);

    container.register("Dropzone", NoOpDropzone);

    container.register("APIService", ClientSideApi);
    container.register("APIRetrievalRepository", ClientSideRetrievalRepository);

    FakeLoginComponent.$inject = ["TokenService"];

    return container;
  }
}
