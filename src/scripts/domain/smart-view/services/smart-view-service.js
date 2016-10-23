import {stringToTimestamp} from '../../../libs/js-utils/type/date-utils';

import immutable from 'immutable';


export default function (smartViewRepository) {

  return {
    async saveSmartView(smartViewData){
      const newData = smartViewData;

      return await smartViewRepository.save(newData);
    }

  };

}
