const agreementPath = 'agreements';
const assetPath     = 'assets';

export default function (apiService) {

  const repository = {
    async save(agreement) {
      const path = `${agreementPath}/${agreement.id}`;
      return await apiService.update(path, agreement);
    },

    async getAgreementArtifactSignedObject(artifactId) {
      const path = `${assetPath}/${artifactId}`;
      return await apiService.retrieve(path);
    }
  };

  return repository;
}
