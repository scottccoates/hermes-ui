import ManagementItem from 'src/scripts/aggregates/management-item/models/management-item';

export default{
  create(name){
    const mi = ManagementItem._from_attrs(name);
    return mi;
  }
}
