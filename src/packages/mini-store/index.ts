import { inject, reactive } from 'vue';

const STORE_KEY = '__store__';
function useStore() {
  return inject(STORE_KEY);
}

function createStore(options) {
  return new StorageEvent(options);
}

class Store {
  constructor(options) {
    this._state = reactive({
      data: options.state(),
    });
    this._mutations = options.mutations;
  }
}

export { createStore, useStore };
