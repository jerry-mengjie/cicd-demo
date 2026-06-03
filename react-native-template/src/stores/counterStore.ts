import { observable } from 'mobx';

const counterStore = observable({
  count: 0,

  increment() {
    counterStore.count++;
  },

  decrement() {
    counterStore.count--;
  },
});

export default counterStore;
