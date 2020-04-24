<template>
    <div
        class="Task"
        :class="`depth-${depth}`"
    >
        <div class="task">
            <p class="title" v-text="title" />

            <p
                v-if="due"
                class="due"
                v-text="formatTime(due)"
            />

            <!-- <font-awesome-icon icon="check" class="icon" /> -->
        </div>

        <!-- TODO: maak hem collabsible -->
        <Tasklist
            v-if="childs.length > 0"
            class="childs"
            :depth="depth"
            :tasks="childs"
        />
    </div>
</template>

<script>
import Tasklist from "@/components/Tasks/Tasklist.vue";

export default {
    name: 'Task',
    components: {Tasklist},
    props: {
        depth: {
            type: Number,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        due: {
            type: Date,
            required: false
        },
        childs: {
            type: Array,
            required: true
        }
    },
    methods: {
        /**
         * @param {Date} date
         * @returns {String}
         */
        formatTime(date) {
            const DAYS = [ 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ];
            const MONTHS = [ 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'november', 'december' ];

            let day = DAYS[ date.getDay() ];
            let dayText = this.$t(`days.${day}.short`);
            let month = MONTHS[ date.getMonth() ];
            let monthText = this.$t(`months.${month}.short`);
            let dayN = date.getDate();
            let hours = date.getHours().toString().padStart(2, '0');
            let minutes = date.getMinutes().toString().padStart(2, '0');

            return this.$t('time.tasks', {
                day: dayText,
                month: monthText,
                dayN: dayN,
                hours: hours,
                minutes: minutes
            });
        }
    }
}
</script>

<style lang="scss" scoped>
div.Task {
    &:not(.depth-1) {
        margin: 0 2em;
    }
    
    &:not(:first-of-type) {
        margin-top: 1em;
    }

    div.task {
        padding: .5em 1em;
        background-color: var(--current-theme-lighter);
        border-radius: .3em;

        .icon {
            float: right;
        }
    }
}
</style>
