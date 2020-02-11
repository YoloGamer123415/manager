// eslint-disable-next-line no-unused-vars
import axios, { AxiosPromise, AxiosRequestConfig } from "axios";

const apiEndpoint = 'http://localhost:8000';
const corsProxy = 'http://0.0.0.0:8001';

export default {
    install(Vue) {
        const Http = new Vue({
            data() {
                return {
                    token: null,
                    validFunction: code => code >= 200 && code < 500
                }
            },
            methods: {
                /**
                 * Set the token for the x-token headers.
                 * @param {string} newToken
                 */
                setToken(newToken) {
                    this.token = newToken;
                },

                setValidFunction (validFunction) {
                    if (typeof validFunction == "function")
                        this.validFunction = validFunction;
                },

                /**
                 *
                 * @param {AxiosRequestConfig} options
                 * @returns {AxiosPromise}
                 */
                request(options) {
                    return axios(options);
                },

                /**
                 *
                 * @param {AxiosRequestConfig} options
                 * @param {string} url
                 * @param {string} requestType
                 * @return {AxiosRequestConfig}
                 */
                parseOptions (options, url, requestType = 'get') {
                    let temp = options;

                    if (!temp)
                        temp = {};

                    if (!temp.headers)
                        temp.headers = {};

                    // eslint-disable-next-line no-console
                    console.log(corsProxy, apiEndpoint, url, `${corsProxy}/${apiEndpoint}/${url.replace(/^\//, '')}`);
                    temp.method = requestType;
                    temp.url = `${corsProxy}/${apiEndpoint}/${url.replace(/^\//, '')}`;
                    temp.headers['x-token'] = this.token;

                    return temp;
                },

                /**
                 *
                 * @param {string} url
                 * @param {AxiosRequestConfig} options
                 * @param {function(code: number): boolean} valid
                 * @return {AxiosPromise}
                 */
                get (url, options, valid = this.validFunction) {
                    return new Promise((resolve, reject) => {
                        this.request(
                            this.parseOptions(options, url, 'get')
                        )
                            .then(res => {
                                if (valid(res.status))
                                    resolve(res.data);
                                else
                                    reject(res.data);
                            });
                    });
                },

                /**
                 *
                 * @param {string} url
                 * @param {AxiosRequestConfig} options
                 * @param {function(code: number): boolean} valid
                 * @return {AxiosPromise}
                 */
                post (url, options, valid = this.validFunction) {
                    return new Promise((resolve, reject) => {
                        this.request(
                            this.parseOptions(options, url, 'post')
                        )
                            .then(res => {
                                if (valid(res.status))
                                    resolve(res.data);
                                else
                                    reject(res.data);
                            })
                    });
                }
            }
        });

        Vue.prototype.$http = Http;
    }
}
