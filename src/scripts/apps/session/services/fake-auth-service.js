export default function () {
  return {
    getThirdPartyAuth(token){
      return {token};
    },

    renewAuth(token){
      return token;
    }
  };

};
