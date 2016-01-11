const searchPath = 'search';

export default function (apiService) {

  const repository = {
    async search(searchText) {
      const path = `${searchPath}`;
      return await apiService.retrieve(path, {q: searchText});
    }
  };

  return repository;
};
