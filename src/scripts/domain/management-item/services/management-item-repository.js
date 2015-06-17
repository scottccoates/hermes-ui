import Immutable from 'immutable';

const path = "management-item";

export default function (apiService) {

  const repository = {
    async save(managementItem) {
      return apiService.saveData(path, managementItem);
    }
  };

  return repository;
};
