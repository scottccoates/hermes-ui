import AgreementFactory from './agreement-factory';

import AgreementActions from '../messaging/actions/agreement-actions';

export default function (miRepository) {

  return {
    async create({name}){
      const agreement = AgreementFactory.create(name);
      return this.addToCollection(agreement);
    },

    async save(mi){
      return miRepository.addToCollection(mi);
    },

    processAgreementData(data){
      return data;
    }
  };

};
