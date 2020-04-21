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
        this.color = options.color;
        this.time = options.time;
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
                     * @type {Calendar[]}
                     */
                    calendars: [],
                    /**
                     * @type {Number}
                     * @todo Check if data saving is toggled. If so, make delay longer (10 mins or something along those lines).
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
                 * @returns
                 */
                getAppointments(startDate, endDate) {
                    return new Promise((resolve, reject) => {
                        if ( Date.now() > Math.ceil(this.lastTimeFetched + this.refreshRate) ) {
                            this._getCalendars()
                                .then(() => {
                                    let uri = startDate
                                        ? (
                                            `${startDate.toISOString()}/` + endDate
                                                ? `${endDate.toISOString()}/`
                                                : ''
                                        )
                                        : '';

                                    // TODO: maybe rewrite with Promise.all() ?
                                    this.calendars.forEach(async calendarId => {
                                        try {
                                            let res = await this._fetch(`/appointments/${calendarId}/${uri}`)
                                            res.appointments.forEach(item => {
                                                /**
                                                 * @type {Calendar | null}
                                                 */
                                                let calendar = this.calendars.get(item.id);
                                                
                                                if (calendar)
                                                    calendar.addAppointment( new Appointment(item) );
                                            });
                                        } catch (err) {
                                            reject(err);
                                        }
                                    });

                                    resolve([ ...this.calendars.values() ]);
                                })
                                .catch(reject);
                        } else {
                            resolve([ ...this.calendars.values() ]);
                        }
                    });
                }
            }
        });

        Vue.prototype.$agenda = Agenda;
    }
}
