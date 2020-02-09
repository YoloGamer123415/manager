import checkContrast from "@/assets/javascript/contrastChecker";

export default {
    install(Vue) {
        const ContrastChecker = new Vue({
            methods: {
                /**
                 * Returns a true or false whether or not the color is in rgb format.
                 * @param {string} color
                 * @return {boolean}
                 */
                isHex(color) {
                    return (/^#[0-9a-f]{6}$|^#[0-9a-f]{3}$/).test(color.trim());
                },
                /**
                 * Transform the hex color into rgb form.
                 * @param {string} hex The color in hex format.
                 * @returns {string} The color in rgb format
                 * @example
                 * // both return 'rgb(0,0,0)'
                 * hexToRgb('#000')
                 * hexToRgb('#000000')
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
                    if (this.isHex(color))
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

                    return checkContrast(color1, color2);
                }
            }
        });

        Vue.prototype.$contrastChecker = ContrastChecker;
    }
}
