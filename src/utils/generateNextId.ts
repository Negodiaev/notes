/**
 * Generates an id for the next item in the list.
 *
 * @param {array} items – The array of items to generate the next id for.
 * @return {string} The max current id increased by 1.
 */
export function generateNextId<T extends { id: string }>(items: T[]): string {
  return String(Number(items.length ? items[0].id : 0) + 1);
}
