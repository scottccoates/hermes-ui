const agreementPath = 'agreements';

export default function (apiService) {

  const repository = {
    async save(agreement) {
      const path = `${agreementPath}/${agreement.agreementId}`;
      return await apiService.update(path, agreement);
    },

    async getAgreementArtifactSignedObject(agreementId, artifactId) {
      const path = `${agreementPath}/${agreementId}/artifacts/${artifactId}`;
      return await apiService.retrieve(path);
    }
  };

  return repository;
};
