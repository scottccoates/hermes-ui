import MIActions from 'src/apps/management-item/actions/actions';

import Routes from 'src/settings/routes';

MIActions.createMIFileUpload.completed.listen(()=> {
  Routes.router.transitionTo('miForm');
});
