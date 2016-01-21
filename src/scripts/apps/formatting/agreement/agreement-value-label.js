import agreementEnums from 'src/scripts/apps/formatting/agreement/agreement-enums';
import formattingService from 'src/scripts/apps/formatting/services/formatting-service';

const durationTypes = formattingService.getValueLabelFromObject(agreementEnums.durationTypes);
const renewTypes    = formattingService.getValueLabelFromObject(agreementEnums.renewTypes);
const sortTypes     = formattingService.getValueLabelFromObject(agreementEnums.sortTypes);

export default {
  durationTypes,
  renewTypes,
  sortTypes
};
