import {stringToTimestamp} from 'src/scripts/libs/js-utils/type/date-utils';

import immutable from 'immutable';


export default function (agreementTypeRepository) {

  return {
    async saveAgreementType(agreementTypeData){

      const newData = Object.assign({}, agreementTypeData);

      return await agreementTypeRepository.save(newData);
    }

  };

}
