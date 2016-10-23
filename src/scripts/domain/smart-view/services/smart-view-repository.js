const smartViewPath = 'smart-views';

export default function (apiService) {

  const repository = {
    async save(smartView) {
      const smartViewId = smartView.id;

      if (smartViewId) {
        const path = `${smartViewPath}/${smartViewId}`;
        return await apiService.update(path, smartView);
      }
      else {
        const path = `${smartViewPath}`;
        return await apiService.create(path, smartView);
      }
    }
  };

  return repository;
}
