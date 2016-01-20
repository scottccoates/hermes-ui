const routerSearchPath = '/search';

export default function (history) {

  return {
    transition(path, parameters = null){
      history.push({pathname: path, query: parameters});
    }

  };

};
