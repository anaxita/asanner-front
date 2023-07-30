export const setItemToStore = (key, payload, store = localStorage) => store.setItem(key, payload);
