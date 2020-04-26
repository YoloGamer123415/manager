/**
 * @typedef {Object} TaskListOptions
 * @property {String} id
 * @property {String} title
 * @property {Date} updated
 */

/**
 * @typedef {Object} TaskOptions
 * @property {String} id
 * @property {String} title
 * @property {Date} [due]
 * @property {Task[]} childs
 */

class TaskList {
    /**
     * Creates an instance of TaskList.
     * 
     * @param {TaskListOptions} options
     * @memberof TaskList
     */
    constructor(options) {
        this.id = options.id;
        this.title = options.title;
        this.update = new Date(options.updated);

        /**
         * @type {TaskItem[]}
         */
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }
}

class TaskItem {
    /**
     * Creates an instance of Task.
     * 
     * @param {TaskOptions} options
     * @memberof Task
     */
    constructor(options) {
        this.id = options.id;
        this.title = options.title;
        this.due = options.due ? new Date(options.due) : null;
        this.childs = options.childs;
    }

    addChild(child) {
        this.childs.push(child);
    }
}

/**
 * Parse all the tasks.
 *
 * @param {Object[]} tasks
 * @returns {TaskItem[]}
 */
function parseTasks(tasks, i) {
    let ret = [];
    //eslint-disable-next-line no-console
    console.log(i, tasks, typeof tasks, tasks instanceof TaskItem)

    tasks.forEach(task => {
        let childs = [];

        if (task.childs.length > 0) {
            childs = parseTasks(task.childs, i+1);
        }

        let newTask = new TaskItem(task);
        childs.forEach(child => newTask.addChild(child) );

        ret.push(newTask);
    });

    return ret;
}

// TODO: [API] verwijder dubbele dingen (als ze inspringen)
export default {
    install(Vue) {
        const Tasks = new Vue({
            data() {
                return {
                    /**
                     * @type {Number}
                     */
                    lastTimeFetched: 0,
                    /**
                     * @type {Map<String, TaskList>}
                     */
                    taskLists: new Map(),
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

                _getTaskLists() {
                    return new Promise((resolve, reject) => {
                        this._fetch(`/tasks/`)
                            .then(res => {
                                /**
                                 * @type {Map<String, TaskList>}
                                 */
                                let temp = new Map();
                                res.tasklists.forEach(tasklist => {
                                    temp.set(tasklist.id, new TaskList(tasklist) );
                                });

                                this.taskLists = temp;

                                resolve();
                            })
                            .catch(reject);
                    });
                },

                getTasks() {
                    return new Promise((resolve, reject) => {
                        if ( Date.now() > Math.ceil(this.lastTimeFetched + this.refreshRate)) {
                            this._getTaskLists()
                                .then(async () => {
                                    let keys = [ ...this.taskLists.keys() ];

                                    for (let i = 0; i < keys.length; i++) {
                                        try {
                                            let tasklist = this.taskLists.get( keys[i] );

                                            let res = await this._fetch(`/tasks/${tasklist.id}/`);
                                            let tasks = parseTasks(res.tasks, 0);
                                            tasks.forEach(task => tasklist.addTask(task) );
                                        } catch (err) {
                                            reject(err);
                                        }
                                    }

                                    this.lastTimeFetched = Date.now();
                                    resolve([ ...this.taskLists.values() ]);
                                })
                                .catch(reject);
                        } else {
                            resolve([ ...this.taskLists.values() ]);
                        }
                    });
                }
            }
        });

        Vue.prototype.$tasks = Tasks;
    }
}
