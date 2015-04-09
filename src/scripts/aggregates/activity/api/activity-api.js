import Immutable from 'immutable';
import MockAPI from 'src/libs/api/mock/mock-api';

import ActivityActions from 'src/aggregates/activity/actions/actions';

const activity1 = {
  id: 1,
  actorName: 'Bob Hen',
  activityContent: 'amended the Service Contract for Design and Branding today at 9:58 AM.',
  activityType: 'amend'
};

const activity2 = {
  id: 2,
  actorName: 'Holly Scheuring',
  activityContent: 'commented on Sales Contract Between Hermes Inc. and Jake’s Down Home Restaurant yesterday at 11:06AM.',
  activityType: 'comment'
};

const activity3 = {
  id: 3,
  actorName: 'Bob Hen',
  activityContent: 'created the Sales Contract Between Hermes Inc. and Jake’s Down Home Restaurant two days ago.',
  activityType: 'create'
};

const activity4 = {
  id: 4,
  actorName: 'Holly Scheduring',
  activityContent: 'amended the Sales Contract Between Hermes Inc. and Jake’s Down Home Restaurant just now.',
  activityType: 'amend'
};


var activities = Immutable.List([activity1, activity2, activity3]);

const api = {
  getActivities() {
    return MockAPI.provideResponse(activities);
  }
};

const unsubscribe = ActivityActions.loadActivities.completed.listen((data)=> {
  unsubscribe();

  activities = Immutable.List([activity1, activity2, activity3, activity4]);

  MockAPI.provideResponse(activities)
      .then(()=>ActivityActions.loadActivities.completed(activities));

});


export default api;
