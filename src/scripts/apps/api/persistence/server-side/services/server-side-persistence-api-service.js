import humps from 'humps';
import 'whatwg-fetch';

export default function (persistenceApiServiceUrl, appStore) {

  const serverSideAPI = {
    async update(path, data){
      const url   = `${persistenceApiServiceUrl}/${path}/`;
      const state = appStore.getState();
      const token = state.session.token;

      const body = JSON.stringify(humps.decamelizeKeys(data), (k, v)=> v == undefined ? null : v);
      // replace undefined with null because stringify will just simply remove undefined from the payload (which we don't want)
      // we want to explicitly send a null value to the api

      // http://blog.gospodarets.com/fetch_in_action/
      const response = await fetch(url, {
        method: 'PUT',
        body: body,
        headers: {
          'Authorization': `JWT ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      const status = response.status;

      if (status < 200 || status > 299) {
        throw new Error(response.statusText)
      }

      return response;
    }
  };

  return serverSideAPI;
}
