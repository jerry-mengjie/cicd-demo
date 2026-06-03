import { makeAutoObservable } from 'mobx';

class DemoStore {
  constructor() {
    makeAutoObservable(this);
  }

  name = 'Guest';
  age = 18;

  setName(name: string) {
    this.name = name;
  }

  setAge(age: number) {
    this.age = age;
  }
}

export default new DemoStore();
