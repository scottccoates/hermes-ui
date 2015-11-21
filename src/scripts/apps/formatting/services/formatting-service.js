export default {
  getValueLabelFromObject(obj){
    const formData = Object.keys(obj).map(origKey=> {

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
    return formData;
  }
};
