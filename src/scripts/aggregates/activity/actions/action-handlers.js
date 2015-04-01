import ActivityActions from 'src/aggregates/activity/actions/actions';

import container from 'src/settings/di';

const activityAPI = container.get('ActivityAPI');

ActivityActions.loadActivities.listenAndPromise(activityAPI.getActivities);
