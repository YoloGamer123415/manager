// eslint-disable-next-line no-unused-vars
import axios, { AxiosPromise, AxiosRequestConfig } from "axios";

/**
 *
 * @param {AxiosRequestConfig} options
 * @return {AxiosPromise}
 */
function request(options) {
    // eslint-disable-next-line no-console
    console.log(options);
    return axios(options);
}

export default {
    install(Vue) {
        const Http = new Vue({
            data: {
                token: null
            },
            methods: {
                setToken (token) {
                    this.token = token;
                },

                /**
                 *
                 * @param {string} url
                 * @param {AxiosRequestConfig} options
                 * @return {AxiosPromise}
                 */
                get (url, options) {
                    if (!options)
                        options = {};

                    if (!options.headers)
                        options.headers = {};

                    options.method = 'get';
                    options.url = `https://cors-anywhere.herokuapp.com/${url}`;
                    options.headers['x-token'] = this.token;

                    return request(options);
                },

                /**
                 *
                 * @param {string} url
                 * @param {AxiosRequestConfig} options
                 * @return {AxiosPromise}
                 */
                post (url, options) {
                    if (!options)
                        options = {};

                    if (!options.headers)
                        options.headers = {};

                    options.method = 'post';
                    options.url = `https://cors-anywhere.herokuapp.com/${url}`;
                    options.headers['x-token'] = this.token;

                    return request(options);
                }
            }
        });

        Vue.prototype.$http = Http;
    }
}
