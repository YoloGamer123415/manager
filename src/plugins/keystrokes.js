export default {
    install(Vue) {
        const Keystrokes = new Vue({
            data() {
                return {
                    patterns: [],
                    pressed: [],
                    clear: null,
                    delay: 1000
                }
            },
            methods: {
                /**
                 *
                 * @param {string} keyPattern
                 * @param {(function): void} callback
                 */
                register (keyPattern, callback = () => {}) {
                    // eslint-disable-next-line no-console
                    console.log('wtf');

                    if (
                        typeof keyPattern == "string" &&
                            typeof callback == "function"
                    ) {
                        this.patterns.push({
                            pattern: keyPattern,
                            callback
                        });
                    }
                },

                clearPresses () {
                    this.pressed = [];
                    this.clear = null;
                }
            },
            mounted() {
                document.onkeydown = function (e) {
                    // eslint-disable-next-line no-console
                    console.log(e.key);
                    // this.pressed.push(e.key);
                }
            }
        });

        //eslint-disable-next-line no-console
        console.log(Vue, Keystrokes);
        Vue.constructor.$keystrokes = Keystrokes;
    }
}
