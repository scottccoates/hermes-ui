export default function (managementItemService) {

  const managementItemActions = {

    async save(data) {
      const retVal = await managementItemService.create(data);
      return retVal;
    },

    async uploadContractBegan(data){
    },

    uploadContractProgressed(progress){
    },

    uploadContractCompleted(data){
    }
  };

  return managementItemActions;
};
