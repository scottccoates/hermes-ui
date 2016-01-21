const routerSearchPath = '/search';

export default function (searchRepository, routingService) {

  return {
    transitionToAdvancedSearchPage(parameters){
      routingService.transition(routerSearchPath, parameters);
    },

    transitionToAdvancedSearchPagef(parameters){
      routingService.transition(routerSearchPath, parameters);
    },

    async simpleSearch(query){
      const resultSet = await searchRepository.simpleSearch(query);

      resultSet.query = query;

      return resultSet;
    },

    async advancedSearch(parameters){
      const resultSet = await searchRepository.advancedSearch(parameters);

      resultSet.query = parameters;

      return resultSet;
    }
  };

};
