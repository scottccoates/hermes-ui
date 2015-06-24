import Agreement from '../models/agreement';

export default{
  create(name){
    const agreement = Agreement._from_attrs(name);
    return agreement;
  }
}
