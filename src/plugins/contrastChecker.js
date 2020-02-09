import {checkContrast} from "wcag-color-contrast-checker";

export default {
    install(Vue) {
        const ContrastChecker = new Vue({
            methods: {
                /**
                 * Returns a true or false whether or not the color is in rgb format.
                 * @param {string} color
                 * @return {boolean}
                 */
                isRgb(color) {
                    return color.trim().startsWith('rgb');
                },
                /**
                 * Transform the hex color into rgb form.
                 * @param {string} hex The color in hex format.
                 * @returns {string} The color in rgb format
                 * @example
                 * // both return 'rgb(0,0,0)'
                 * rgbToHex('#000')
                 * rgbToHex('#000000')
                 */
                hexToRgb: function(hex) {
                    hex = hex.replace(/^#/, '');

                    if (hex.length !== 6)
                        throw new Error('"hex" has to be of length 6');

                    let r = parseInt(`${hex[0]}${hex[1]}`, 16),
                        g = parseInt(`${hex[2]}${hex[3]}`, 16),
                        b = parseInt(`${hex[4]}${hex[5]}`, 16);

                    return `rgb(${r},${g},${b})`;
                },
                splitColor: function (color) {
                    if (this.isRgb(color))
                        color = this.hexToRgb(color);

                    let temp = color.replace(/rgb\((.+)\)/, '$1')
                        .split(/ *, */)
                        .map(c => parseInt(c));

                    return {
                        r: temp[0],
                        g: temp[1],
                        b: temp[2]
                    }
                },
                check(color1, color2) {
                    color1 = this.splitColor(color1);
                    color2 = this.splitColor(color2);

                    // eslint-disable-next-line no-console
                    console.log(color1, color2);

                    return checkContrast(color1, color2)
                }
            }
        });

        Vue.prototype.$contrastChecker = ContrastChecker;
    }
}
