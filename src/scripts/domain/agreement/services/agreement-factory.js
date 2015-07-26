import agreementListItem from '../models/agreement-list-item-model';
import agreementDetail from '../models/agreement-detail-model';
import * as normalizers from 'src/scripts/libs/domain/tcomb/normalizers';

export default{
  createAgreementListItem(listData){

    const agreementData = Object.assign({}, listData);

    const agreement = agreementListItem._from_attrs(agreementData);
    return agreement;
  },

  createAgreementDetail(detailData){
    const agreementData = Object.assign({}, detailData);

    const agreement = agreementDetail._from_attrs(agreementData);
    return agreement;
  }
}
