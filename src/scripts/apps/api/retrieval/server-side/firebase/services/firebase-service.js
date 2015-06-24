import Humps from 'humps';

export default {
  prepareCollection(collection){
    const data         = [];
    var camelizedChild = null;

    collection.forEach(child => {
      // remember the retval of forEach has a meaning: https://www.firebase.com/docs/web/guide/retrieving-data.html#section-event-types
      camelizedChild = Humps.camelizeKeys(child.val());
      data.push(camelizedChild);
    });

    return data;
  }
};
