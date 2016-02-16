import humps from 'humps';
import 'whatwg-fetch';
import {stringify} from 'query-string';

export default function (persistenceApiServiceUrl, appStore) {

  const serverSideAPI = {
    _getPath(path) {
      return `${persistenceApiServiceUrl}/${path}/`;
    },

    _getState(){
      return appStore.getState();
    },

    _getBody(data) {
      // replace undefined with null because stringify will just simply remove undefined from the payload (which we don't want)
      // we want to explicitly send a null value to the api
      return JSON.stringify(humps.decamelizeKeys(data), (k, v)=> v == undefined ? null : v);
    },

    async _getResponse(method, url, body) {
      // http://blog.gospodarets.com/fetch_in_action/

      const state = this._getState();
      const token = state.session.token;

      const response = await fetch(url, {
        method: method,
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

      // don't call .json (if response has empty string
      var retVal = await response.text();
      if (retVal) {
        retVal = JSON.parse(retVal);
        retVal = humps.camelizeKeys(retVal);
      }

      return retVal;
    },

    async retrieve(path, data = null){
      let url = this._getPath(path);

      if (data) {
        const parameters = humps.decamelizeKeys(data);

        const queryString = stringify(parameters);
        url               = `${url}?${queryString}`
      }

      const body = null;

      const response = await this._getResponse('GET', url, body);

      return response;
    },

    async update(path, data){
      const url = this._getPath(path);

      const body = this._getBody(data);

      const response = await this._getResponse('PUT', url, body);

      return response;
    },

    async create(path, data){
      const url = this._getPath(path);

      const body = this._getBody(data);

      const response = await this._getResponse('POST', url, body);

      return response;
    }
  };

  return serverSideAPI;
}
