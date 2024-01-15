export const storage = {
  setItem: (key, value) => {
    sessionStorage.setItem(key, value);
  },
  getItem: (key) => {
    sessionStorage.getItem(key);
  },
};
