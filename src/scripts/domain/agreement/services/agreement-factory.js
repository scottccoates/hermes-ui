import agreementListViewItem from '../models/agreement-list-view-item';
import * as normalizers from 'src/scripts/libs/domain/tcomb/normalizers';

export default{
  createAgreementListViewItem(data){

    const agreementData = Object.assign({}, data);

    agreementData.expirationDate = normalizers.stringDateNormalize(data.expirationDate);
    agreementData.modifiedDate   = normalizers.stringDateNormalize(data.expirationDate);

    const agreement = agreementListViewItem._from_attrs(agreementData);
    return agreement;
  }
}
