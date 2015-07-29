import agreementListItem from '../models/agreement-list-item-model';
import agreementDetail from '../models/agreement-detail-model';
import * as normalizers from 'src/scripts/libs/domain/tcomb/normalizers';

export default{
  createAgreementListItem(listItemData){
    const agreement = agreementListItem._from_attrs(listItemData);
    return agreement;
  },

  createAgreementDetail(detailData){
    const agreement = agreementDetail._from_attrs(detailData);
    return agreement;
  }
}
