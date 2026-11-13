import AsyncStorage from '@react-native-async-storage/async-storage';

export const readJson = async <T>(key: string): Promise<T | null> => {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};

export const writeJson = async (key: string, value: unknown): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage is a convenience here, so a failed write should never crash the app.
  }
};

export const removeKey = (key: string) => AsyncStorage.removeItem(key);
