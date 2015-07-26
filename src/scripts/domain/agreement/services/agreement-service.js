import AgreementFactory from './agreement-factory';

import AgreementActions from '../messaging/actions/agreement-actions';

import immutable from 'immutable';


export default function (agreementRepository) {

  return {
    async create(data){
      const agreement = AgreementFactory.create(data);
      return this.addToCollection(agreement);
    },

    async save(mi){
      return agreementRepository.addToCollection(mi);
    },

    processAgreementListData(listData){
      var retVal = listData.map(a => AgreementFactory.createAgreementListItem(a));
      retVal     = immutable.List(retVal);

      return retVal;
    },

    processAgreementDetailData(detailData){
      const retVal = AgreementFactory.createAgreementDetail(detailData);

      return retVal;
    }
  };

};
