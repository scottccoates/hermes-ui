export default function () {
  return {
    getThirdPartyAuthInformation(token){
      return {fakeThirdPartyAuth: {info: token.toUpperCase()}};
    },

    renewAuthToken(token){
      return token;
    }
  };

};
