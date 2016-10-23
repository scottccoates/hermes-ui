import log from 'loglevel';

export default function (auth0Lock) {

  return {
    getThirdPartyAuthInformation(token){
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
            reject(new Error(`Error getting firebase token: ${delegationResult}. Inner exception: ${error.error_description}`));
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

    renewAuthToken(idToken){
      // https://auth0.com/docs/libraries/lock/using-a-refresh-token
      // renewing a token doesn't fetch the data from their database, it simply reruns whatever was passed into the token.
      const promise = new Promise((resolve, reject) => {
        const client = auth0Lock.getClient();

        client.renewIdToken(idToken, function (error, delegationResult) {

          if (error) {
            // error is not typeof Error
            reject(new Error(`Error getting new token: ${idToken}. Inner exception: ${error.error_description}`));
          }
          else {
            // the reason we're not actually providing the new profile is because
            // when we impersonate someone, the jwt has very little scope and there isn't a convenient way to expand it.
            // however, I did check and it appears that renewIdToken doesn't actually fetch new data from auth0;
            // const token   = delegationResult.id_token;
            // const profile = client.decodeJwt(token);
            // remember to change the session service to now use the newLoginInfo.token and newLoginInfo.profile

            const token = delegationResult.id_token;
            resolve(token);
          }
        });
      });

      return promise;
    }
  };
}
