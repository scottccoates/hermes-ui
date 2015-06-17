import ManagementItem from '../models/management-item';

export default{
  create(name){
    const mi = ManagementItem._from_attrs(name);
    return mi;
  }
}
