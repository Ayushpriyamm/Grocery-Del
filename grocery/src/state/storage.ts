import AsyncStorage from '@react-native-async-storage/async-storage';

export const mmkvStorage = {
  setItem: (key: string, value: string) => {
    AsyncStorage.setItem(key, value);
  },
  getItem: (key: string) => {
    const value = AsyncStorage.getItem(key);
    return value ?? null;
  },
  removeItem: (key: string) => {
    AsyncStorage.removeItem(key);
  }
}
export default mmkvStorage;
