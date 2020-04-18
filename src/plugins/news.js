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
        this.image  = options.image;
        this.title  = options.title;
        this.text   = options.text;
        this.url    = options.url;
        this.author = options.author;
        this.source = options.source;
    }
}

export default {
    install(Vue) {
        const News = new Vue({
            data() {
                return {
                    /**
                     * @type {number}
                     */
                    lastTimeFetched: 0,
                    /**
                     * @type {NewsItems[]}
                     */
                    news: [],
                    /**
                     * @type {number}
                     */
                    refreshRate: 1000 * 15
                }
            },
            methods: {
                /**
                 *
                 * @private
                 */
                _fetch() {
                    return new Promise((resolve, reject) => {
                        Vue.prototype.$http.get(`/news/`)
                            .then(res => {
                                resolve(res.data);
                            })
                            .catch(reject)
                    });
                },
                get() {
                    return new Promise((resolve, reject) => {
                        if (
                            this.lastTimeFetched &&
                                Date.now() > Math.ceil(this.lastTimeFetched + this.refreshRate)
                        ) {
                            this._fetch()
                                .then(res => {
                                    if (!(res && res.news)) {
                                        reject(`Something went wrong`);
                                    } else {
                                        let temp = [];

                                        res.news.forEach(item => {
                                            temp.push( new NewsItems(item) );
                                        });

                                        this.news = temp;
                                        this.lastTimeFetched = Date.now();
                                        resolve(this.news);
                                    }
                                })
                                .catch(reject)
                        } else {
                            resolve(this.news);
                        }
                    });
                }
            }
        });

        Vue.prototype.$news = News;
    }
}
