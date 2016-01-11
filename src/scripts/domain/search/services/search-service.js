const routerSearchPath = 'search';

export default function (searchRepository, routingService) {

  return {
    transitionToAdvancedSearchPage(parameters){
      routingService.transition(routerSearchPath, parameters);
    },

    async simpleSearch(query){
      const resultSet = await searchRepository.simpleSearch(query);

      resultSet.query = query;

      return resultSet;
    }
  };

};
