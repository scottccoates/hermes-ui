import T from 'tcomb';

const ManagementItem = T.struct({
  name: T.Str,              // required string
});
ManagementItem._from_attrs = function (name) {
  return new this({name});
};

export default ManagementItem;
