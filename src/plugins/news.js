/**
 * @typedef {Object} NewsItemsOptions
 * @property {string | null} image
 * @property {string} title
 * @property {string | null} text
 * @property {string} url
 * @property {string | null} author
 * @property {string | null} source
 */

// class NewsItems {
//     /**
//      *
//      * @param {NewsItemsOptions} options
//      */
//     constructor(options) {
//         this.image  = options.image;
//         this.title  = options.title;
//         this.text   = options.text;
//         this.url    = options.url;
//         this.author = options.author;
//         this.source = options.source;
//     }
// }

export default {
    install(Vue) {
        const News = new Vue({
            data() {
                return {
                    /**
                     * @type {number}
                     */
                    lastTimeFetched: 1,
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
                        /* eslint-disable no-console */
                        console.log(this.lastTimeFetched);
                        console.log(this.refreshRate);
                        console.log(Date.now());
                        console.log(Math.ceil(this.lastTimeFetched + this.refreshRate));
                        console.log(Date.now() > Math.ceil(this.lastTimeFetched + this.refreshRate));
                        console.log(this.lastTimeFetched && Date.now() > Math.ceil(this.lastTimeFetched + this.refreshRate));

                        if (
                            this.lastTimeFetched &&
                                Date.now() > Math.ceil(this.lastTimeFetched + this.refreshRate)
                        ) {
                            // eslint-disable-next-line no-console
                            console.log('fetch :(');
                            this._fetch()
                                .then(res => {
                                    if (!(
                                        res &&
                                            res.news
                                    )) {
                                        reject(`Something went wrong`);
                                    } else {
                                        this.news = res.news;
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
