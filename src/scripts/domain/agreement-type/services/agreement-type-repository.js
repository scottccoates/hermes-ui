const agreementTypePath = 'agreement-types';

export default function (apiService) {

  const repository = {
    async save(agreementType) {
      const agreementTypeId = agreementType.id;

      if (agreementTypeId) {
        const path = `${agreementTypePath}/${agreementTypeId}`;
        return await apiService.update(path, agreementTypeId);
      }
      else {
        const path = `${agreementTypePath}`;
        return await apiService.create(path, agreementType);
      }
    }
  };

  return repository;
}
