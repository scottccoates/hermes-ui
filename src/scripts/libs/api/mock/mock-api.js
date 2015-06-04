import sleep from 'src/scripts/libs/js-utils/async/sleep';

const mockAPI = {

  async provideResponse(dataToProvide) {

    const timeout = Math.round(Math.random() * (3000 - 500)) + 500;

    await sleep(timeout);

    return dataToProvide;
  }
};

export default mockAPI;
