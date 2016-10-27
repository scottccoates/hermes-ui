import agreementEnums from './agreement-enums';
import formattingService from '../services/formatting-service';

const timeTypes  = formattingService.getValueLabelFromObject(agreementEnums.timeTypes);
const renewTypes = formattingService.getValueLabelFromObject(agreementEnums.renewTypes);
const sortTypes  = formattingService.getValueLabelFromObject(agreementEnums.sortTypes);

export default {
  timeTypes,
  renewTypes,
  sortTypes
};
