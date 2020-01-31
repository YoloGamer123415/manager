import Vue from "vue";

class EventBus {
    constructor() {
        /**
         * The eventbus.
         * @type {Vue}
         * @private
         */
        this._EventBus = new Vue();
    }

    /**
     * Emit a global event.
     * @param {string} event
     * @param {any[]} [data=null]
     */
    emit(event, data = null) {
        this._EventBus.$emit(event, data);
    }

    /**
     *
     * @param {string | string[]} event
     * @param {Function} callback
     */
    once(event, callback) {
        this._EventBus.$once(event, callback);
    }

    /**
     *
     * @param {string | string[]} event
     * @param {Function} callback
     */
    on(event, callback) {
        this._EventBus.$on(event, callback);
    }
}

export default new EventBus();
