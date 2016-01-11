import {stringify} from 'query-string';

const routerSearchPath = '/search';

export default function (history) {

  return {
    transition(path, parameters = null){

      let search = null;
      if (parameters) {
        search = this.convertParametersToQueryString(parameters);
      }

      history.push({pathname: path, search: search});
    },

    convertParametersToQueryString(parameters){
      let queryString = stringify(parameters);
      queryString     = `?${queryString}`;

      return queryString;
    }
  };

};
