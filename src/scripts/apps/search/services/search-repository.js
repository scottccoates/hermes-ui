const searchPath          = 'search';
const federatedSearchPath = `${searchPath}/federated`;
const advancedSearchPath  = `${searchPath}/agreements`;

export default function (apiService) {

  const repository = {
    async simpleSearch(query) {
      return await apiService.retrieve(federatedSearchPath, {q: query});
    },

    async advancedSearch(parameters) {
      return await apiService.retrieve(advancedSearchPath, parameters);
    }
  };

  return repository;
}
