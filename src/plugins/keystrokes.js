export default {
    install(Vue) {
        const Keystrokes = new Vue({
            data() {
                return {
                    patterns: [],
                    pressed: [],
                    clear: null,
                    delay: 500
                }
            },
            methods: {
                /**
                 *
                 * @param {string} keyPattern
                 * @param {function: void} callback
                 */
                register (keyPattern, callback = () => {}) {
                    if (
                        typeof keyPattern == "string" &&
                            typeof callback == "function"
                    ) {
                        this.patterns.push({
                            keys: keyPattern,
                            callback
                        });
                    }
                },

                clearPresses () {
                    this.pressed = [];
                    this.clear = null;
                }
            },
            created() {
                document.onkeydown = e => {
                    this.pressed.push(e.key);

                    let totalPresses = this.pressed.join('');

                    this.patterns.forEach(pattern => {
                        if (totalPresses === pattern.keys)
                            pattern.callback();
                    });

                    if (this.clear) {
                        clearInterval(this.clear);
                        this.clear = null;
                    }

                    this.clear = setTimeout(() => {
                        this.clearPresses();
                    }, this.delay)
                }
            }
        });

        Vue.prototype.$keystrokes = Keystrokes;
    }
}
