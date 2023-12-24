/**
 * Fetches items from the LocalStorage by the array name.
 *
 * @param {string} arrayName – The name of the array in the LocalStorage.
 * @return {array} The array from the LocalStorage.
 * */
export function getArrayFromLS<T>(arrayName: string): T[] {
  return JSON.parse(localStorage.getItem(arrayName) || '[]');
}
