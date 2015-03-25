import MIActions from 'src/apps/management-item/actions';

import Routes from 'src/settings/routes';

MIActions.newMIFileUpload.completed.listen(()=> {
  Routes.router.transitionTo('miForm');
});
