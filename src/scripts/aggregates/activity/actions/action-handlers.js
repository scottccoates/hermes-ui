import ActivityActions from 'src/scripts/aggregates/activity/actions/actions';

import container from 'src/scripts/settings/di';

const activityAPI = container.get('ActivityAPI');

ActivityActions.loadActivities.listenAndPromise(activityAPI.getActivities);
