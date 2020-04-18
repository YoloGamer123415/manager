export default {
    install(Vue) {
        const Keystrokes = new Vue({
            data() {
                return {
                    patterns: new Map(),
                    pressed: [],
                    clear: null,
                    delay: 500
                }
            },
            methods: {
                /**
                 * Register a keypress pattern to watch.
                 * 
                 * @param {string} keyPattern
                 * @param {function: void} callback
                 */
                register(keyPattern, callback = () => {}) {
                    if (
                        typeof keyPattern == "string" &&
                            typeof callback == "function"
                    ) {
                        this.patterns.set(keyPattern, callback)
                    }
                },


                /**
                 * Remove a keypress pattern.
                 *
                 * @param {string} keyPattern
                 */
                remove(keyPattern) {
                    this.patterns.delete(keyPattern);
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

                    if (this.patterns.has(totalPresses))
                        ( this.patterns.get(totalPresses) )();

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
