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
                 * Transform the rgb color into hex form.
                 * @param {string} rgb The color in rgb format.
                 * @returns {string} The color in hex format
                 * @example
                 * // both return '#000000'
                 * rgbToHex('rgb(0,0,0)')
                 * rgbToHex('rgb(0, 0, 0)')
                 */
                rgbToHex: function(rgb) {
                    if (!rgb.match(/^rgb\( *([0-9]{1,3}, *){2}([0-9]{1,3} *)\)$/))
                        throw new Error(`"rgb" has to be in rgb format`);

                    let colors = rgb.replace(/rgb\((.+)\)/, '$1')
                        .split(',')
                        .map(c => {
                            let temp = parseInt(c);
                            if (temp < 0)
                                return 0;
                            else if (temp > 255)
                                return 255;
                            else
                                return temp;
                        });

                    // eslint-disable-next-line no-console
                    console.log(colors);
                },
                splitColor: function (color) {
                    if (this.isRgb(color))
                        color = this.rgbToHex(color);
                }
            }
        });

        Vue.prototype.$contrastChecker = ContrastChecker;
    }
}