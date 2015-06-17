export default function (activityService) {

  const activityActions = {

    async getActivities() {
      const retVal = await activityService.getActivities();
      return retVal;
    }
  };

  return activityActions;
};
