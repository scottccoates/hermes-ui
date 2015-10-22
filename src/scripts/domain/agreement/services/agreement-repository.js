const agreementPath = 'agreements';

export default function (apiService) {

  const repository = {
    async save(agreement) {
      const path = `${agreementPath}/${agreement.agreementId}`;
      return await apiService.update(path, agreement);
    }
  };

  return repository;
};
