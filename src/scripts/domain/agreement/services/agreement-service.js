import agreementFactory from './agreement-factory';

import {timestampFromDate} from 'src/scripts/libs/js-utils/type/date-utils';

import immutable from 'immutable';


export default function (agreementRepository) {

  return {
    async create(data){
      const agreement = agreementFactory.create(data);
      return this.addToCollection(agreement);
    },

    async save(mi){
      return agreementRepository.addToCollection(mi);
    },

    processAgreementListData(listData){
      var retVal = listData.map(a => agreementFactory.createAgreementListItem(a));
      retVal     = immutable.List(retVal);

      return retVal;
    },

    processAgreementDetailData(detailData){
      const retVal = agreementFactory.createAgreementDetail(detailData);

      return retVal;
    },

    async saveAgreement(agreementData){
      const executionDate = timestampFromDate(agreementData.executionDate);
      const newData       = Object.assign({}, agreementData, {executionDate});

      return await agreementRepository.save(newData);
    },

    async deleteAgreement(agreementId){
      return await agreementRepository.delete(agreementId);
    },

    async getAgreementArtifactSignedUrl(artifactId){
      const retVal = await agreementRepository.getAgreementArtifactSignedObject(artifactId);

      return retVal.url;
    }
  };

};
