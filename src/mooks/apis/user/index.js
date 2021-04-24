import { fakePromise } from '../helper';
import { userData } from './init';

class User {
  constructor() {
    this.user = userData;
  }

  getAllUser() {
    if (!this.user) return undefined;
    return fakePromise(this.user);
  }

  getUser(ind) {
    if (ind < 0) return undefined;
    return fakePromise(this.user[ind]);
  }

  getUserName(username, password) {
    const ind = this.user.findIndex((item) => item.username === username);

    if (ind < 0) return fakePromise(undefined, 'username invalid !!! Please try again.');
    if (this.user[ind].password !== password) return fakePromise(undefined, 'password invalid !!! Please try again.');
    return fakePromise(ind);
  }

  addUser({ id, username, password, role }) {
    this.user.push({ id, username, password, role });
    return fakePromise({ id, username, role });
  }
  
  editUser(data) {
    const { id } = data;
    const ind = this.user.findIndex((item) => item.id === id);
    this.user[ind] = {...this.user[ind], ...data};
    return fakePromise(this.user[ind]);
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
