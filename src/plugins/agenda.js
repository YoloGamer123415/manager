/**
 * @typedef {Object} Color
 * @property {String} foreground
 * @property {String} background
 */

/**
 * @typedef {Object} Time
 * @property {Date} start
 * @property {Date} end
 */

/**
 * @typedef {Object} AppointmentOptions
 * @property {String} id
 * @property {String} title
 * @property {String} location
 * @property {String} description
 * @property {Color} color
 * @property {Time} time
 */

/**
 * @typedef {Object} CalendarOptions
 * @property {String} id
 * @property {String} timezone
 * @property {String} summary
 * @property {Boolean} hidden
 * @property {Color} color
 */

const HOUR_HEIGHT = 200;

class Appointment {
    /**
     * Creates an instance of Appointment.
     * 
     * @param {AppointmentOptions} options
     * @memberof Appointment
     */
    constructor(options) {
        this.id = options.id;
        this.title = options.title;
        this.location = options.location;
        this.description = options.description;
        this.color = options.color;
        this.time = {};
        this.time.start = new Date(options.time.start);
        this.time.end = new Date(options.time.end)
    }
}

class Calendar {
    /**
     * Creates an instance of Calendar.
     * 
     * @param {CalendarOptions} options
     * @memberof Calendar
     */
    constructor(options) {
        this.id = options.id;
        this.timezone = options.timezone;
        this.summary = options.summary;
        this.hidden = options.hidden;
        this.color = options.color;

        /**
         * @type {Appointment[]}
         */
        this.appointments = [];
    }

    /**
     * Add an appointment to the calendar (does *not* update in Google Calendar).
     *
     * @param {Appointment} appointment
     * @memberof Calendar
     */
    addAppointment(appointment) {
        this.appointments.push(appointment);
    }
}

/**
 * @param {Number} num
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
const minmax = (num, min, max) => {
    if (num < min)
        return min;
    else
    if (num > max)
        return max;
    else
        return num;
}

export default {
    install(Vue) {
        const Agenda = new Vue({
            data() {
                return {
                    /**
                     * @type {Number}
                     */
                    lastTimeFetched: 0,
                    /**
                     * @type {Map<String, Calendar>}
                     */
                    calendars: new Map(),
                    /**
                     * @type {Number}
                     * @todo Check if data saving is toggled. If so, make delay longer (10 mins or something along those lines).
                     */
                    refreshRate: 1000 * 1,
                    /**
                     * @type {Number}
                     */
                    HOUR_HEIGHT: HOUR_HEIGHT
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

                _getCalendars() {
                    return new Promise((resolve, reject) => {
                        this._fetch(`/calendars/`)
                            .then(res => {
                                /**
                                 * @type {Map<String, Calendar>}
                                 */
                                let temp = new Map();
                                res.calendars.forEach(item => {
                                    temp.set(item.id, new Calendar(item) );
                                });

                                this.calendars = temp;

                                resolve();
                            })
                            .catch(reject);
                    });
                },

                /**
                 * @param {Date} [startDate]
                 * @param {Date} [endDate]
                 * @returns {Calendar[]}
                 */
                getAppointments(startDate, endDate) {
                    return new Promise((resolve, reject) => {
                        // TODO: moet een rewrite met check of de dagen al bestaan en het anders opslaan (per dag)
                        if ( Date.now() > Math.ceil(this.lastTimeFetched + this.refreshRate) ) {
                            this._getCalendars()
                                .then(async () => {
                                    let uri = startDate ? `${startDate.toISOString()}/` : '';
                                    uri += endDate ? `${endDate.toISOString()}/` : '';

                                    let keys = [ ...this.calendars.keys() ];

                                    // TODO: maybe rewrite with Promise.all() ?
                                    for (let i = 0; i < keys.length; i++) {
                                        try {
                                            let calendar = this.calendars.get( keys[i] );
                                            
                                            let res = await this._fetch(`/appointments/${encodeURIComponent(calendar.id)}/${uri}`)
                                            res.appointments.forEach(item => {
                                                if (calendar)
                                                    calendar.addAppointment( new Appointment(item) );
                                            });
                                        } catch (err) {
                                            reject(err);
                                        }
                                    }

                                    // TODO: voeg dit weer toe, maar het vereist een rewrite :(
                                    // this.lastTimeFetched = Date.now();
                                    resolve([ ...this.calendars.values() ]);
                                })
                                .catch(reject);
                        } else {
                            resolve([ ...this.calendars.values() ]);
                        }
                    });
                },

                getBusy(startDate) {
                    return new Promise((resolve, reject) => {
                        let uri = startDate ? `/busy/${startDate}/` : '/busy/';
                        this._fetch(uri)
                            .then(res => {
                                resolve(res.hours);
                            })
                            .catch(reject);
                    });
                },

                /**
                 * Get the current appointment in calendar {@link calendarId}.
                 *
                 * @param {String} calendarId
                 * @returns {Appointment}
                 */
                async getCurrent(calendarId) {
                    let now = Date.now();

                    if (this.calendars.size <= 0)
                        await this.getAppointments();

                    /**
                     * @type {Calendar[]}
                     */
                    let calendars = [ ...this.calendars.values() ].filter(c => c.id === calendarId);

                    for (let i = 0; i < calendars.length; i++) {
                        let calendar = calendars[i];

                        for (let j = 0; j < calendar.appointments.length; j++) {
                            let appointment = calendar.appointments[j];
                            /**
                             * @type {Date}
                             */
                            let startDate = appointment.time.start;

                            if (startDate.getTime() >= now)
                                return calendar.appointments[ minmax(j - 1, 0, Infinity) ];
                        }
                    }

                    return null;
                },

                /**
                 * Get the next appointment in calendar {@link calendarId}.
                 *
                 * @param {String} calendarId
                 * @returns {Appointment}
                 */
                async getNext(calendarId) {
                    let now = Date.now();

                    if (this.calendars.size <= 0)
                        await this.getAppointments();

                    /**
                     * @type {Calendar[]}
                     */
                    let calendars = [ ...this.calendars.values() ].filter(c => c.id === calendarId);

                    for (let i = 0; i < calendars.length; i++) {
                        let calendar = calendars[i];

                        for (let j = 0; j < calendar.appointments.length; j++) {
                            let appointment = calendar.appointments[j];
                            /**
                             * @type {Date}
                             */
                            let startDate = appointment.time.start;

                            if (startDate.getTime() >= now)
                                return appointment;
                        }
                    }

                    return null;
                }
            }
        });

        Vue.prototype.$agenda = Agenda;
    }
}
