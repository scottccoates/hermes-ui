import bacon from 'baconjs';

export default {
  observeStateStream(store, mapFunc){

    const storeBinderFunc = sink => {
      store.subscribe(_=>sink(store.getState()));
    };

    const stream = bacon
      .fromBinder(storeBinderFunc)
      .map(mapFunc)
      .skipDuplicates();

    return stream;
  }

};
