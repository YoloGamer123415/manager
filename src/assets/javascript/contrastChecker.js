// This comes from https://github.com/BlueskyFR/wcag-color-contrast-checker,
// but it didn't work, so I changed it a bit.

/**
 * @typedef {Object} Color
 * @property {number} r The red value, between 0 and 255.
 * @property {number} g The green value, between 0 and 255.
 * @property {number} b The blue value, between 0 and 255.
 */

/**
 * 4.5:1
 * @type {number}
 */
const MIN_CONTRAST_RATIO = 4.5;

/**
 * Returns the relative luminance for a given color
 * @param {number} r A number between 0 and 255.
 * @param {number} g A number between 0 and 255.
 * @param {number} b A number between 0 and 255.
 * @return {number}
 */
function getLuminance(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    let red = r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4;
    let green = g <= 0.03928 ? g / 12.92 : ((g + 0.055) / 1.055) ** 2.4;
    let blue = b <= 0.03928 ? b / 12.92 : ((b + 0.055) / 1.055) ** 2.4;

    // Compute and return luminance
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

/**
 *
 * @param {Color} c1
 * @param {Color} c2
 * @return {number}
 */
function getContrastRatio(c1, c2) {
    let l1 = getLuminance(c1.r, c1.g, c1.b);
    let l2 = getLuminance(c2.r, c2.g, c2.b);

    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

/**
 * Returns whether or not the two colors are enough contrasted.
 * @param {Color} c1
 * @param {Color} c2
 * @return {boolean}
 */
function checkContrast(c1, c2) {
    return getContrastRatio(c1, c2) >= MIN_CONTRAST_RATIO;
}

export default checkContrast;
