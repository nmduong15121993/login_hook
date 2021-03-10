import { userData } from './init';
import { fakePromise } from '../helper';

class User {
  constructor() {
    this.user = userData;
  }

  getUser(id) {
    const ind = this.user.findIndex((item) => item.id === id);
    console.log(ind);
    if (ind < 0) return undefined;
    return fakePromise(this.user[ind]);
  }

  getUserName(username, password) {
    const ind = this.user.findIndex((item) => item.username === username);

    if (ind < 0) return fakePromise(undefined, 'username sai');
    if (this.user[ind].password !== password) return fakePromise(undefined, 'password sai');
    return fakePromise(this.user[ind]);
  }

  addUser({ id, username, password }) {
    this.user.push({ id, username, password });
    return fakePromise({ id, username });
  }

  removeUser(id) {
    const ind = this.user.findIndex((item) => item.id === id);
    if (ind < 0) throw new Error('Not found user !');
    const userRemoved = this.user[ind];
    this.user.splice(ind, 1);
    return fakePromise(userRemoved);
  }
}

export { User };
