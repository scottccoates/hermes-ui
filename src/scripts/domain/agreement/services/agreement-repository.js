const agreementPath = 'agreements';
const assetPath     = 'assets';

export default function (apiService) {

  const repository = {
    async save(agreement) {
      const path = `${agreementPath}/${agreement.agreementId}`;
      return await apiService.update(path, agreement);
    },

    async delete(agreementId) {
      const path = `${agreementPath}/${agreementId}`;
      return await apiService.delete(path, agreementId);
    },

    async getAgreementArtifactSignedObject(artifactId) {
      const path = `${assetPath}/${artifactId}`;
      return await apiService.retrieve(path);
    }
  };

  return repository;
};
