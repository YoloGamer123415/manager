/**
 * @typedef {Object} NewsItemsOptions
 * @property {string | null} image
 * @property {string} title
 * @property {string | null} text
 * @property {string} url
 * @property {string | null} author
 * @property {string | null} source
 */

class NewsItems {
    /**
     *
     * @param {NewsItemsOptions} options
     */
    constructor(options) {

    }
}

class News {
    constructor() {
        /**
         *
         * The last time news got fetched.
         * @type {Date | null}
         */
        this.timeFetched = null;

        /**
         * All the newsitems from the last fetch.
         * @type {NewsItems[]}
         */
        this.news = [];

        /**
         * The refreshrate of the news from the api in milliseconds.
         * @type {number}
         */
        this.refreshrate = 1000 * 15;
    }

    get() {
        if (Date.now() < this.timeFetched)
    }
}

export default new News();
