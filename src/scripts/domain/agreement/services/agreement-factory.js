import agreementListItem from '../models/agreement-list-item';
import * as normalizers from 'src/scripts/libs/domain/tcomb/normalizers';

export default{
  createAgreementListItem(data){

    const agreementData = Object.assign({}, data);

    agreementData.expirationDate = normalizers.stringDateNormalize(data.expirationDate);
    agreementData.modifiedDate   = normalizers.stringDateNormalize(data.expirationDate);

    const agreement = agreementListItem._from_attrs(agreementData);
    return agreement;
  }
}
