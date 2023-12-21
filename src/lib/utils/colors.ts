const MAX_COLOR_VALUE = parseInt("ffffff", 16);

/**
 * Get a randomized color, value in HEX format, excluding the value passed as parameter.
 */
export function getRandomHexColor(color: string) {
  const currentColor = parseInt(color.replace("#", ""), 16);
  let nextColor = currentColor;
  while (nextColor === currentColor || isNaN(nextColor)) {
    nextColor = Math.floor(Math.random() * MAX_COLOR_VALUE);
  }
  return `#${nextColor.toString(16).padStart(6, "0")}`;
}

/**
 * Get the color value, in HEX format, that follows the value passed as parameter.
 */
export function getNextHexColor(color: string) {
  const currentColor = parseInt(color.replace("#", ""), 16);
  let nextColor = isNaN(currentColor) ? 0 : currentColor + 255 * 3;
  if (nextColor >= MAX_COLOR_VALUE) nextColor = 0;
  return `#${nextColor.toString(16).padStart(6, "0")}`;
}
