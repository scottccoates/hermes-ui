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

    async getAgreementDetails(agreementId) {
      return agreementRepository.getAgreementDetails(mi);
    },

    processAgreementData(data){
      var retVal = data.map(a => AgreementFactory.createagreementListViewItem(a));
      retVal     = immutable.List(retVal);

      return retVal;
    }
  };

};
