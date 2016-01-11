//import agreementFactory from './agreement-factory';

import {stringToTimestamp} from 'src/scripts/libs/js-utils/type/date-utils';

import immutable from 'immutable';


export default function (agreementTypeRepository) {

  return {
    async create(data){
      const agreement = agreementFactory.create(data);
      return this.addToCollection(agreement);
    },

    async save(mi){
      return agreementTypeRepository.addToCollection(mi);
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

    async editAgreement(agreementData){
      const executionDate = stringToTimestamp(agreementData.executionDate);
      const newData       = Object.assign({}, agreementData, {executionDate});

      return await agreementTypeRepository.save(newData);
    },

    async getAgreementArtifactSignedUrl(artifactId){
      const retVal = await agreementTypeRepository.getAgreementArtifactSignedObject(artifactId);

      return retVal.url;
    }
  };

};
