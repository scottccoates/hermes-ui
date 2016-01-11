export default function (searchRepository) {

  return {
    async search(searchText){
      return searchRepository.search(searchText);
    }
  };

};
