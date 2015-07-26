import T from 'tcomb';

const agreementDetailDocument = T.struct({
  id: T.Str,
  name: T.Str,
  url: T.Str
});

//noinspection JSUnresolvedFunction
const agreementDetail = T.struct({
  id: T.Str,
  name: T.Str,
  counterparty: T.Str,
  type: T.Str,
  initialTermLength: T.Str,
  description: T.Str,
  documents: T.list(agreementDetailDocument, 'documents')
});

agreementDetail._from_attrs = function (data) {
  return new this(data);
};

export default agreementDetail;
