/* jshint -W030 */
'use strict';

import Intravenous from 'intravenous';

import FileUpload from 'src/libs/react-js/components/file-upload';

import MI from 'src/apps/management-item/components/management-item';
import NewMI from 'src/apps/management-item/components/new/new-management-item';
import MIForm from 'src/apps/management-item/components/new/management-item-form';

import Dashboard from 'src/apps/dashboard/components/dashboard';

import TaskList from 'src/apps/task/components/task-list';
import TaskItem from 'src/apps/task/components/task-item';
import TaskListStore from 'src/apps/task/stores/task-list-store';
import TaskAPI from 'src/aggregates/task/api/task-api';

import ActivityList from 'src/apps/activity/components/activity-list';
import ActivityItem from 'src/apps/activity/components/activity-item';
import ActivityListStore from 'src/apps/activity/stores/activity-list-store';
import ActivityAPI from 'src/aggregates/activity/api/activity-api';

import Dropzone from 'dropzone';
import NoOpDropzone from 'src/libs/file-upload/no-op-dropzone';

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

container.register("NewMI", NewMI);

container.register("MI", MI);
container.register("MIForm", MIForm);

container.register("FileUpload", FileUpload);
container.register("Dropzone", NoOpDropzone);

NewMI.$inject = ["FileUpload"];

FileUpload.$inject = ["DropzoneFactory"];

Dashboard.$inject = ["TaskList", "TaskListStore", "ActivityList", "ActivityListStore"];

TaskList.$inject = ["TaskItem"];

ActivityList.$inject = ["ActivityItem"];

export default container;
