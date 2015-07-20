export default function () {
  return {
    getTokenData(authData){

      return {
        idToken: 'fake-token',
        profile: {
          nickname:authData.username,
          picture: '/assets/images/client-side/andy-profile-pic.jpg'
        }
      };

    }
  };
};
