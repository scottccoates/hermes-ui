import humps from 'humps';

export default {
  prepareCollection(collection){
    const data         = [];
    var camelizedChild = null;

    collection.forEach(child => {
      // remember the retval of forEach has a meaning: https://www.firebase.com/docs/web/guide/retrieving-data.html#section-event-types
      camelizedChild = this.prepareObject(child);
      data.push(camelizedChild);
    });

    return data;
  },

  prepareObject(inputObject, ...childCollections){
    const inputObjectValue = inputObject.val();
    inputObjectValue.id    = inputObject.key();

    for (let child of childCollections) {
      inputObjectValue[child] = this.prepareCollection(inputObject.child(child));
    }

    const retVal = humps.camelizeKeys(inputObjectValue);

    return retVal;
  }
};
