export default function () {
  return {
    getThirdPartyAuth(token){
      return {fakeThirdPartyAuth: {info: token.toUpperCase()}};
    },

    renewAuth(token){
      return token;
    }
  };

};
