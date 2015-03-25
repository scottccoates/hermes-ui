import Reflux from 'reflux';

const Actions = Reflux.createActions({
  "newMIFileUpload": {
    asyncResult: true,
    children: ["progressed"]
  }
});

export default Actions;
