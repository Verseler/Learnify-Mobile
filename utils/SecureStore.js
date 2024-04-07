import * as SecureStore from "expo-secure-store";

function setItem(key, value) {
  SecureStore.setItem(key, value);
}

function getItem(key) {
  let result = SecureStore.getItem(key);
  return result ? result : null;
}

async function deleteItem(key) {
  await SecureStore.deleteItemAsync(key)
}

export { setItem, getItem, deleteItem };
