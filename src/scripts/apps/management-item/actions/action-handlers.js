import MIActions from 'src/scripts/apps/management-item/actions/actions';

import Routes from 'src/scripts/settings/routes.js!jsx';

MIActions.createMIFileUpload.completed.listen(()=> {
  Routes.router.transitionTo('miForm');
});
