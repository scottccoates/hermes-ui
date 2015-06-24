const apiPath = "login";

const clientSidePersistencePath = "session";

export default function (clientSidePersistenceRepo) {

  // This object is the decision maker for retrieving/storing session information.
  // This repo chooses to store it locally

  return {
    async saveLoginInfo(token, user){
      const retVal = await clientSidePersistenceRepo.save(clientSidePersistencePath, {token, user});

      return retVal;
    },

    async deleteLoginInfo(){
      const retVal = await clientSidePersistenceRepo.delete(clientSidePersistencePath);

      return retVal;
    },

    async getLoginInfo(){
      const sessionInformation = await clientSidePersistenceRepo.get(clientSidePersistencePath);
      return sessionInformation;
    }
  };
};
