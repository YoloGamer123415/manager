/**
 * @typedef {Object} NotificationOptions
 * @property {string} [key='unknown'] The key to for the translation path for the notification. If null, {@link title} and {@link text} will be used.
 * @property {'info' | 'error' | 'success'} [type='info'] The type of notification which determines the backgroundcolor. info gives theme.mainColor, error gives red and success gives green.
 * @property {number} [time=3000] The time, in milliseconds, to show the notification.
 */

const types = [
    'info',
    'error',
    'success'
];

export default {
    install(Vue) {
        const Notifications = new Vue({
            data() {
                return {
                    callbacks: []
                }
            },
            methods: {
                /**
                 * Emit an event to show a new notification.
                 * @param {NotificationOptions} options
                 */
                newNotification (options) {
                    if (!(
                        options.key &&
                            options.type
                    )) {
                        throw new Error("Please specify all options")
                    }

                    options.type = types.includes(options.type)
                        ? options.type
                        : 'info';
                    options.key = typeof options.key == "string"
                        ? `${options.type}.${options.key}`
                        : 'error.unknown';
                    options.time = typeof options.time == "number" && options.time > 1000 && options.time < 10000
                        ? options.time
                        : 5000;

                    this.callbacks.forEach(cb => {
                        if (typeof cb == "function")
                            cb(options);
                    })
                },
                /**
                 * Register a new callback for notifications.
                 * @param callback
                 * @returns {boolean} Whether or not the callback was valid.
                 */
                registerNotificationCallback (callback) {
                    if (typeof callback == "function") {
                        this.callbacks.push(callback);
                        return true
                    } else
                        return false;
                }
            }
        });

        Vue.prototype.$notifications = Notifications;
    }
}
