import T from 'tcomb';

const Agreement = T.struct({
  name: T.Str,              // required string
});
Agreement._from_attrs = function (name) {
  return new this({name});
};

export default Agreement;
