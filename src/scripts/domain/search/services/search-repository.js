const searchPath          = 'search';
const federatedSearchPath = `${searchPath}/federated`;

export default function (apiService) {

  const repository = {
    async simpleSearch(query) {
      return await apiService.retrieve(federatedSearchPath, {q: query});
    }
  };

  return repository;
};
