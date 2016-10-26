export default {
  getValueLabelFromObject(obj){
    const valueLabel = Object.keys(obj).map(origKey=> {

      var newKey;

      if (origKey === 'true') {
        newKey = true;
      }
      else if (origKey === 'false') {
        newKey = false;
      }
      else {
        newKey = origKey;
      }

      const retVal = {label: obj[newKey], value: newKey};

      return retVal;
    });
    return valueLabel;
  },

  getValueLabelFromArray(array){

    const valueLabel = array.map(item=> {

      var newValue;

      if (item.id === 'true') {
        newValue = true;
      }
      else if (item.id === 'false') {
        newValue = false;
      }
      else {
        newValue = item.id;
      }

      const retVal = {label: item.name, value: newValue};

      return retVal;
    });
    return valueLabel;
  }
};
