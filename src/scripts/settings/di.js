/* jshint -W030 */
'use strict';

import Intravenous from 'intravenous';

import FileUpload from 'src/scripts/libs/react-js/components/file-upload.js!jsx';

import MIComponent from 'src/scripts/apps/management-item/components/management-item.js!jsx';
import CreateMIComponent from 'src/scripts/apps/management-item/components/new-management-item/create-management-item.js!jsx';
import MIFormComponent from 'src/scripts/apps/management-item/components/new-management-item/management-item-form.js!jsx';
import MIService from 'src/scripts/aggregates/management-item/services/management-item-service';

import Dashboard from 'src/scripts/apps/dashboard/components/dashboard.js!jsx';

import TaskList from 'src/scripts/apps/task/components/task-list.js!jsx';
import TaskItem from 'src/scripts/apps/task/components/task-item.js!jsx';
import TaskListStore from 'src/scripts/apps/task/stores/task-list-store';
import TaskAPI from 'src/scripts/aggregates/task/api/task-api';

import ActivityList from 'src/scripts/apps/activity/components/activity-list.js!jsx';
import ActivityItem from 'src/scripts/apps/activity/components/activity-item.js!jsx';
import ActivityListStore from 'src/scripts/apps/activity/stores/activity-list-store';
import ActivityAPI from 'src/scripts/aggregates/activity/api/activity-api';

import SearchResultList from 'src/scripts/apps/search/components/result/search-result-list.js!jsx';
import SearchResultItem from 'src/scripts/apps/search/components/result/search-result-item.js!jsx';

import Dropzone from 'dropzone';
import NoOpDropzone from 'src/scripts/libs/file-upload/no-op-dropzone';

const container = Intravenous.create({
  onDispose: function (obj, serviceName) {
    console.log('wtf!!!!!', obj, serviceName);
  }
});

container.register("Dashboard", Dashboard);

container.register("TaskList", TaskList);
container.register("TaskItem", TaskItem);
container.register("TaskListStore", TaskListStore, "singleton"); //http://www.royjacobs.org/intravenous/#how_can_i_control_the_lifecycle_of_a_service
container.register("TaskAPI", TaskAPI);

container.register("ActivityList", ActivityList);
container.register("ActivityItem", ActivityItem);
container.register("ActivityListStore", ActivityListStore, "singleton"); //http://www.royjacobs.org/intravenous/#how_can_i_control_the_lifecycle_of_a_service
container.register("ActivityAPI", ActivityAPI);

container.register("SearchResultList", SearchResultList);
container.register("SearchResultItem", SearchResultItem);

container.register("MIComponent", MIComponent);
container.register("CreateMIComponent", CreateMIComponent);
container.register("MIFormComponent", MIFormComponent);
container.register("MIService", MIService);

container.register("FileUpload", FileUpload);
container.register("Dropzone", NoOpDropzone);

CreateMIComponent.$inject = ["FileUpload"];
MIFormComponent.$inject = ["MIService"];

FileUpload.$inject = ["DropzoneFactory"];

Dashboard.$inject = ["TaskList", "TaskListStore", "ActivityList", "ActivityListStore"];

TaskList.$inject = ["TaskItem"];

ActivityList.$inject = ["ActivityItem"];

SearchResultList.$inject = ["SearchResultItem"];

export default container;
