/* jshint -W030 */
'use strict';

import Intravenous from 'intravenous';

import FileUpload from 'src/libs/components/file-upload';

import MI from 'src/apps/management-item/components/management-item';
import NewMI from 'src/apps/management-item/components/new/new-management-item';
import MIForm from 'src/apps/management-item/components/new/management-item-form';

import Dashboard from 'src/apps/dashboard/components/dashboard';

import TaskList from 'src/apps/task/components/task-list';
import TaskItem from 'src/apps/task/components/task-item';

import TaskListStore from 'src/apps/task/stores/task-list-store';

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
container.register("TaskListStore", TaskListStore);

container.register("NewMI", NewMI);

container.register("MI", MI);
container.register("MIForm", MIForm);

container.register("FileUpload", FileUpload);
container.register("Dropzone", NoOpDropzone);

NewMI.$inject = ["FileUpload"];

FileUpload.$inject = ["DropzoneFactory"];

Dashboard.$inject = ["TaskList", "TaskListStore"];

TaskList.$inject = ["TaskItem"];

export default container;
