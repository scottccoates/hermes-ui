const apiPath = "login";

const clientSidePersistencePath = "session";

export default function (clientSidePersistenceRepo) {

  // This object is the decision maker for retrieving/storing session information.
  // This repo chooses to store it locally

  return {
    saveLoginInfo(token, meta){
      const retVal = clientSidePersistenceRepo.save(clientSidePersistencePath, {token, meta});

      return retVal;
    },

    deleteLoginInfo(){
      const retVal = clientSidePersistenceRepo.delete(clientSidePersistencePath);

      return retVal;
    },

    getLoginInfo(){
      const sessionInformation = clientSidePersistenceRepo.get(clientSidePersistencePath);
      return sessionInformation;
    }
  };
}
