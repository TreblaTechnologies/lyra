import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setStorageItem(key: string, item: string): Promise<any> {
  return await AsyncStorage.setItem(key, item);
}

export async function getStorageItem(key: string): Promise<string | null> {
  return await AsyncStorage.getItem(key);
}

export async function removeStorageItem(key: string): Promise<void> {
  return await AsyncStorage.removeItem(key);
}

export async function multiRemoveFromStorage(keys: string[]): Promise<void> {
  return await AsyncStorage.multiRemove(keys);
}
