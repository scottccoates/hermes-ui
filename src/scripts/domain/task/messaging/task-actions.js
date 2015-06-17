export default function (taskService) {

  const taskActions = {

    async getTasks() {
      const retVal = await taskService.getTasks();
      return retVal;
    }
  };

  return taskActions;
};
