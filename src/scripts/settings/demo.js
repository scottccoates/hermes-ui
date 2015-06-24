import config from 'src/scripts/settings/ioc';

import FakeLoginComponent from 'src/scripts/apps/session/comonents/fake-login';
import FakeTokenService from 'src/scripts/apps/session/services/fake-token-service';

import NoOpDropzone from 'src/scripts/libs/file-upload/no-op-dropzone';

import ClientSideApi from 'src/scripts/apps/api/services/client-side-api';

export default {
  init(){
    const container = config.init();
    container.register("LoginComponent", FakeLoginComponent);

    container.register("Dropzone", NoOpDropzone);

    container.register("APIService", ClientSideApi);

    return container;
  }
}
