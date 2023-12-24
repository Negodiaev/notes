/**
 * Checks if a string includes given text.
 *
 * @param {string} str – string to check.
 * @param {string} substr – substring to find.
 * @return {boolean} – true if str includes substr, false otherwise.
 * */

export function isTextIncluded(str: string, substr: string): boolean {
  return str.toLowerCase().includes(substr.toLowerCase());
}
