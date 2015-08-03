import log from 'loglevel';

export default function (auth0Lock) {

  return {
    getThirdPartyAuth(token){
      const promise = new Promise((resolve, reject) => {
        const fbOptions = {
          id_token: token,    // The auth0 id_token you have now
          targetClientId: auth0Lock.$auth0._clientID, // the clientID is the app from our auth0 dashboard
          api: 'firebase'
        };

        log.info("Beginning: Get delegation token");
        auth0Lock.$auth0.getDelegationToken(fbOptions, (error, delegationResult) => {

          if (error) {
            // error is not typeof Error
            reject(`Error getting firebase token: ${delegationResult}. Inner exception: ${error.error_description}`);
          }
          else {
            const newUser = {firebaseData: {token: delegationResult.id_token}};
            log.info("Completed: Get delegation token");
            resolve(newUser);
          }
        });
      });

      return promise;
    },

    renewAuth(idToken){
      // https://auth0.com/docs/libraries/lock/using-a-refresh-token
      const promise = new Promise((resolve, reject) => {
        const client = auth0Lock.getClient();

        client.renewIdToken(idToken, function (error, delegationResult) {

          // Get here the new JWT via delegationResult.id_token
          if (error) {
            // error is not typeof Error
            reject(`Error getting new token: ${idToken}. Inner exception: ${error.error_description}`);
          }
          else {
            const token   = delegationResult.id_token;
            const profile = client.decodeJwt(token);
            resolve({token, profile});
          }
        });
      });

      return promise;
    }
  };
};
