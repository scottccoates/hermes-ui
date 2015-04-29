import Immutable from 'immutable';
import MockAPI from 'src/libs/api/mock/mock-api';

import ActivityActions from 'src/aggregates/activity/actions/actions';

const activity1 = {
  id: 1,
  actorName: 'Andy Nelson',
  actorImage: '/build/assets/images/andy-profile-pic.jpg',
  activitySubject: 'Licensing Agreement Between Microsoft and Hermes, Inc. for Microsoft Office Suite Products',
  activityAction: 'just now.',
  activityType: 'create',
  activityTypeDisplayName: 'created the'
};

const activity2 = {
  id: 2,
  actorName: 'Bob Hen',
  actorImage: '/build/assets/images/bob-profile-pic.jpg',
  activitySubject: 'Service Contract for Design and Branding',
  activityAction: 'today at 9:58 AM.',
  activityType: 'amend',
  activityTypeDisplayName: 'amended the'
};

const activity3 = {
  id: 3,
  actorName: 'Holly Scheuring',
  actorImage: '/build/assets/images/holly-profile-pic.jpg',
  activitySubject: 'Sales Contract Between Hermes Inc. and Jake’s Down Home Restaurant',
  activityAction: 'yesterday at 11:06AM.',
  activityType: 'comment',
  activityTypeDisplayName: 'commented on the'
};
const activity4 = {
  id: 4,
  actorName: 'Bob Hen',
  actorImage: '/build/assets/images/bob-profile-pic.jpg',
  activitySubject: 'Sales Contract Between Hermes Inc. and Jake’s Down Home Restaurant',
  activityAction: 'two days ago.',
  activityType: 'create',
  activityTypeDisplayName: 'created the'
};


var activities = Immutable.List([activity2, activity3, activity4]);

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
