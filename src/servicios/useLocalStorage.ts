export const useLocalStorage = (key: string) => {
  const setItem = (value: string) => {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      console.error(error);
    }
  };

  const getItem = () => {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      console.error(error);
    }
  };

  return { setItem, getItem };
};

