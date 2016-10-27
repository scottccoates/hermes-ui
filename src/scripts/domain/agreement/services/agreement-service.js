import {timestampFromDate} from '../../../libs/js-utils/type/date-utils';

export default function (agreementRepository) {

  return {
    async saveAgreement(agreementData){
      const executionDate = timestampFromDate(agreementData.executionDate);
      const newData       = Object.assign({}, agreementData, {executionDate});

      return await agreementRepository.save(newData);
    },

    async deleteAgreement(agreementId){
      return await agreementRepository.delete(agreementId);
    },

    async deleteArtifact(agreementId, artifactId){
      return await agreementRepository.deleteArtifact(agreementId, artifactId);
    },

    async getAgreementArtifactSignedUrl(artifactId){
      const retVal = await agreementRepository.getAgreementArtifactSignedObject(artifactId);

      return retVal.url;
    }
  };

};
