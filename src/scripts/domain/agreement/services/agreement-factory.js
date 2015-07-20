import AgreementViewItem from '../models/agreement-view-item';
import * as normalizers from 'src/scripts/libs/domain/tcomb/normalizers';

export default{
  createAgreementViewItem(data){

    const agreementData = Object.assign({}, data);

    agreementData.expirationDate = normalizers.stringDateNormalize(data.expirationDate);
    agreementData.modifiedDate   = normalizers.stringDateNormalize(data.expirationDate);

    const agreement = AgreementViewItem._from_attrs(agreementData);
    return agreement;
  }
}
