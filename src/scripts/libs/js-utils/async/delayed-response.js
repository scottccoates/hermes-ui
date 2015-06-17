import sleep from './sleep';

async function delayedResponse(dataToProvide) {

  const timeout = Math.round(Math.random() * 2500);

  await sleep(timeout);

  return dataToProvide;
}

export default delayedResponse;
