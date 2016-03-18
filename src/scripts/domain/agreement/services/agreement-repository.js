const agreementPath = 'agreements';
const artifactPath  = 'artifacts';
const assetPath     = 'assets';

export default function (apiService) {

  const repository = {
    async save(agreement) {
      const path = `${agreementPath}/${agreement.agreementId}`;
      return await apiService.update(path, agreement);
    },

    async delete(agreementId) {
      const path = `${agreementPath}/${agreementId}`;
      return await apiService.delete(path);
    },

    async deleteArtifact(agreementId, artifactId) {
      const path = `${agreementPath}/${agreementId}/${artifactPath}/${artifactId}`;
      return await apiService.delete(path);
    },

    async getAgreementArtifactSignedObject(artifactId) {
      const path = `${assetPath}/${artifactId}`;
      return await apiService.retrieve(path);
    }
  };

  return repository;
};
