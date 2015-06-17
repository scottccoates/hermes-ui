export default function () {

  const dataTransitionActions = {

    async performAsyncAction(asyncAction) {
      return await asyncAction();
    }
  };

  return dataTransitionActions;
};
