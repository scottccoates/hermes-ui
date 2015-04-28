import Reflux from 'reflux';

const Actions = Reflux.createActions({
  "createMIFileUpload": {
    asyncResult: true,
    children: ["progressed"]
  }
});

export default Actions;
