import { makeAutoObservable } from 'mobx';

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  isLoggedIn = false;

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }
}

export default new AuthStore();
