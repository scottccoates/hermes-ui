const mockAPI = {

  provideResponse(dataToProvide) {

    const timeout = Math.round(Math.random() * (3000 - 500)) + 500;

    const retVal = new Promise((resolve, reject)=> {
      setTimeout(() => {
        resolve(dataToProvide);
      }, timeout);

    });

    return retVal;
  }
};

export default mockAPI;
