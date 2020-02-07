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
                newNotification: function (options) {
                    options.key = typeof options.key == "string"
                        ? options.key
                        : 'error.unknown';
                    options.type = types.includes(options.type)
                        ? options.type
                        : 'info';
                    options.time = typeof options.time == "number" && options.time > 1000 && options.time < 10000
                        ? options.time
                        : 3000;

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
                registerNotificationCallback: function (callback) {
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
