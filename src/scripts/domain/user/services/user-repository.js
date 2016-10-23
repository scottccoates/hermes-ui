const subscribePath = 'checkout';

export default function (apiService) {

  const repository = {
    async subscribeUser(userId, paymentToken) {
      // userService passes in the userId param but we don't need it for now because the server will obtain the user's
      // identity by the JWT passed in for auth.
      const path = `${subscribePath}`;

      const data = {token: paymentToken};
      return await apiService.create(path, data);
    }
  };

  return repository;
}
