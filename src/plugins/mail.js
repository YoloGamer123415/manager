/**
 * @typedef {String} Base64
 */

/**
 * @typedef {Object} User
 * @property {String} [name]
 * @property {String} mail
 */

/**
 * @typedef {Object} FileOptions
 * @property {String} name
 * @property {String} mimeType
 * @property {String} id
 */

/**
 * @typedef {Object} Message
 * @property {String} short
 * @property {String} text
 * @property {String} html
 * @property {File[]} files
 */

/**
 * @typedef {Object} MailOptions
 * @property {String} id
 * @property {String[]} labelIds
 * @property {Date} received
 * @property {User[]} to
 * @property {User} from
 * @property {String} subject
 * @property {Message} message
 */

class File {
    /**
     * Creates an instance of File.
     * 
     * @param {FileOptions} options
     * @memberof File
     */
    constructor(options) {
        this.name = options.name;
        this.mimeType = options.mimeType;
        this.id = options.id;
    }
}

class MailItem {
    /**
     * Creates an instance of Mail.
     * 
     * @param {MailOptions} options
     * @memberof Mail
     */
    constructor(options) {
        this.id              = options.id;
        this.labelIds        = options.labelIds;
        this.received        = new Date(options.received);
        this.to              = options.to;
        this.from            = options.from;
        this.subject         = options.subject;
        this.message         = {};
        this.message.preview = options.message.preview;
        this.message.text    = options.message.text;
        this.message.html    = options.message.html;
        this.message.files   = options.message.files.map(f => new File(f) );
    }
}

export default {
    install(Vue) {
        const Mail = new Vue({
            data() {
                return {
                    /**
                     * @type {Number}
                     */
                    lastTimeFetched: 0,
                    /**
                     * @type {Map<String, Mail>}
                     */
                    mails: new Map(),
                    /**
                     * @type {Number}
                     * @todo Check if data saving is toggled. If so, make delay longer (probably just once).
                     */
                    refreshRate: 1000 * 1
                }
            },
            methods: {
                _fetch(uri) {
                    return new Promise((resolve, reject) => {
                        Vue.prototype.$http.get(uri)
                            .then(res => {
                                resolve(res.data);
                            })
                            .catch(reject);
                    });
                },

                _getUnreadMailIds() {
                    return new Promise((resolve, reject) => {
                        this._fetch(`/mail/unread/`)
                            .then(res => {
                                let ret = [];

                                res.emails.forEach(mail => ret.push(mail.id) );

                                resolve(ret);
                            })
                            .catch(reject);
                    });
                },

                getUnreadMails() {
                    return new Promise((resolve, reject) => {
                        if ( Date.now() > Math.ceil(this.lastTimeFetched + this.refreshRate) ) {
                            this._getUnreadMailIds()
                                .then(async ids => {
                                    for (let i = 0; i < ids.length; i++) {
                                        let res = await this._fetch(`/mail/${ids[i]}/`);
                                        this.mails.set(ids[i], new MailItem(res) );
                                    }

                                    resolve([ ...this.mails.values() ]);
                                })
                                .catch(reject);
                        } else {
                            resolve([ ...this.mails.values() ]);
                        }
                    });
                },
                
                /**
                 * Returns the mail.
                 *
                 * @param {String} id
                 * @returns {Mail}
                 */
                getMail(id) {
                    return this.mails.get(id);
                }
            }
        });

        Vue.prototype.$mail = Mail;
    }
}
