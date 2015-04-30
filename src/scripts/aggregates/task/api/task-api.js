import Immutable from 'immutable';
import MockAPI from 'src/libs/api/mock/mock-api';

const task1 = {
  id: 1,
  taskSubject: "Sales Contract Between Hermes Inc. and Jake's Down Home Restaurant",
  taskAction: 'expires in 17 days.',
  taskType: 'expiration'
};

const task2 = {
  id: 2,
  taskSubject: 'Advance Agreement Between Hermes Inc. and Bruce Baxter',
  taskAction: 'is due for review in 19 days.',
  taskType: 'review'
};

const task3 = {
  id: 3,
  taskSubject: 'Licensing Agreement Between Hermes Inc. and Adobe for Adobe Master Suite',
  taskAction: 'automatically renews in 2 months. You need to give notice in 30 days.',
  taskType: 'renew'
};

const tasks = Immutable.List([task1, task2, task3]);

const api = {
  getTasks() {
    return MockAPI.provideResponse(tasks);
  }
};

export default api;
