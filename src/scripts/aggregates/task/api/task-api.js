import Immutable from 'immutable';

const task1 = {
  id: 1,
  taskName: 'The License Agreement with Microsoft expires in 17 days.',
  taskType: 'expiration'
};

const task2 = {
  id: 2,
  taskName: 'The License Agreement with Bruce Baxter is due for review in 19 days.',
  taskType: 'review'
};

const task3 = {
  id: 3,
  taskName: 'The License Agreement with Adobe will automatically renew in 2 months. You need to give notice in 30 days.',
  taskType: 'renew'
};

const tasks = Immutable.List([task1, task2, task3]);

const api = {

  getTasks() {

    const timeout = Math.round(Math.random() * (3000 - 500)) + 500;

    const retVal = new Promise((resolve, reject)=> {
      setTimeout(() => {
        resolve(tasks);
      }, timeout);

    });

    return retVal;
  }
};

export default api;
