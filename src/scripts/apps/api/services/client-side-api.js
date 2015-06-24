// Consider moving this file to the /persistence/ folder.
// Right now, however, it might be too eraly to assume this service will only handle persistence though.

import ClientSideFlux from '../persistence/client-side/messaging/flux/client-side-flux';

import TextFormatter from 'src/scripts/libs/js-utils/text/formatting/text-formatter';
import DelayedResponse from '../../../libs/js-utils/async/delayed-response';

const flux = new ClientSideFlux();

const clientSideAPI = {

  async saveData(path, data) {
    // get the data-specific repo (ex: task, activity, etc)
    const clientSideRepoName = `${path}-client-side-repository`;
    var moduleName           = `src/scripts/apps/api/persistence/client-side/repositories/${clientSideRepoName}`;
    const repo               = (await System.import(moduleName)).default;

    const retVal = await repo.saveToClient(path, data);

    // let others know about this newly persisted data
    const normalizedPathName = TextFormatter.toTitleCase(path);
    const actionName         = `${normalizedPathName}SavedToClient`;
    flux.getActions('clientSide')[actionName](data);

    return await DelayedResponse(retVal);
  },

  async post(data){
    return "OK";
  }
};

export default clientSideAPI;
