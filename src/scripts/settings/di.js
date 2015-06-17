/* jshint -W030 */
'use strict';

import Intravenous from 'intravenous';

import FileUpload from '../libs/react-js/components/file-upload';

import ReactJsActions from '/src/scripts/libs/react-js/actions/react-js-actions';

import ManagementItemActions from '../domain/management-item/messaging/management-item-actions';
import ManagementItemStore from '../domain/management-item/messaging/stores/management-item-store';
import ManagementItemComponent from '../domain/management-item/components/management-item';
import CreateManagementItemComponent from '../domain/management-item/components/new-management-item/create-management-item';
import ManagementItemFormComponent from '../domain/management-item/components/new-management-item/management-item-form';
import ManagementItemService from '../domain/management-item/services/management-item-service';
import ManagementItemRepository from '../domain/management-item/services/management-item-repository';

import DashboardComponent from '../apps/dashboard/components/dashboard';

import TaskList from '../domain/task/components/task-list';
import TaskItem from '../domain/task/components/task-item';
import TaskListStore from '../domain/task/messaging/stores/task-list-store';
//import TaskAPI from '../domain/task/services/task-service';

import ActivityList from '../domain/activity/components/activity-list';
import ActivityItem from '../domain/activity/components/activity-item';
import ActivityListStore from '../domain/activity/messaging/stores/activity-list-store';
//import ActivityAPI from '../domain/activity/api/activity-api';

import SearchResultList from '../domain/search/components/result/search-result-list';
import SearchResultItem from '../domain/search/components/result/search-result-item';

import LoadingFeedbackStore from '/src/scripts/apps/feedback/stores/loading-feedback-store';

import ClientSideApi from '../apps/api/services/client-side-api';

import Dropzone from 'dropzone';
import NoOpDropzone from '../libs/file-upload/no-op-dropzone';

const container = Intravenous.create({
  onDispose: function (obj, serviceName) {
    console.log('wtf!!!!!', obj, serviceName);
  }
});

container.register("DashboardComponent", DashboardComponent);

container.register("TaskList", TaskList);
container.register("TaskItem", TaskItem);
container.register("ActivityListStore", TaskListStore);
//container.register("TaskAPI", TaskAPI);

container.register("ActivityList", ActivityList);
container.register("ActivityItem", ActivityItem);
container.register("ActivityListStore", ActivityListStore);
//container.register("ActivityAPI", ActivityAPI);

container.register("SearchResultList", SearchResultList);
container.register("SearchResultItem", SearchResultItem);

container.register("ManagementItemComponent", ManagementItemComponent);
container.register("CreateManagementItemComponent", CreateManagementItemComponent);
container.register("ManagementItemFormComponent", ManagementItemFormComponent);
container.register("ManagementItemActions", ManagementItemActions);
container.register("ActivityListStore", ManagementItemStore);
container.register("ManagementItemService", ManagementItemService);
container.register("ManagementItemRepository", ManagementItemRepository);

container.register("FileUpload", FileUpload);
container.register("Dropzone", NoOpDropzone);

container.register("APIService", ClientSideApi);

container.register("ReactJsActions", ReactJsActions);

container.register("LoadingFeedbackStore", LoadingFeedbackStore);

CreateManagementItemComponent.$inject = ["ManagementItemActions", "FileUpload"];
ManagementItemFormComponent.$inject   = ["ManagementItemActions"];
ManagementItemActions.$inject         = ["ManagementItemService"];
ManagementItemService.$inject         = ["ManagementItemRepository"];
ManagementItemRepository.$inject      = ["APIService"];

FileUpload.$inject = ["DropzoneFactory"];

DashboardComponent.$inject = ["TaskList", "ActivityListStore", "ActivityList", "ActivityListStore"];

TaskList.$inject = ["TaskItem"];

ActivityList.$inject = ["ActivityItem"];

SearchResultList.$inject = ["SearchResultItem"];

export default container;
