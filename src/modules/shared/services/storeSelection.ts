const STORE_ID_KEY = 'STORE_ID_KEY';

const clearValue = () => {
  localStorage.removeItem(STORE_ID_KEY);
};

const setValue = (storeId: string) => {
  localStorage.setItem(STORE_ID_KEY, storeId);
};

const getValue = () => {
  return localStorage.getItem(STORE_ID_KEY);
};

export default {
  STORE_ID_KEY,
  clearValue,
  setValue,
  getValue,
};
