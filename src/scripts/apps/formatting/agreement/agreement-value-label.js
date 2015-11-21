import agreementEnums from 'src/scripts/apps/formatting/agreement/agreement-enums';
import formattingService from 'src/scripts/apps/formatting/services/formatting-service';

const agreementTypes = formattingService.getValueLabelFromObject(agreementEnums.agreementTypes);
const durationTypes  = formattingService.getValueLabelFromObject(agreementEnums.durationTypes);
const renewTypes     = formattingService.getValueLabelFromObject(agreementEnums.renewTypes);

export default {
  agreementTypes,
  durationTypes,
  renewTypes
};
