<template>
    <div
        class="Column"
        :style="{
            height: `${height}px`
        }"
    >
        <div class="date">
            <div v-if="dayOffset === 0" class="open">

            </div>

            <div
                class="text"
                :class="{
                    small: dayOffset === 0,
                    'is-today': isToday
                }"
            >
                {{dayText}}
            </div>
        </div>

        <div class="calendar">
            <!-- TODO: check if it's today -->
            <div
                v-if="isToday && dayOffset === 0"
                class="current-time"
                :style="{ top: `${top}px` }"
            />

            <div class="timeline" />

            <div class="appointments-line" ref="appointments">
                <Appointment
                    v-for="appointment in appointments"
                    :key="appointment.id"
                    :title="appointment.title"
                    :description="appointment.description"
                    :location="appointment.location"
                    :color="appointment.color"
                    :time="appointment.time"
                    @fullscreen="fullscreen"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Appointment from "@/components/Agenda/Appointment";

export default {
    name: 'Column',
    components: {Appointment},
    props: {
        isToday: {
            type: Boolean,
            required: true,
        },
        dayOffset: {
            type: Number,
            required: true
        },
        appointments: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            height: 24 * this.$agenda.HOUR_HEIGHT,
            dayText: null,
            top: 0,
            timer: null,
        }
    },
    methods: {
        fullscreen(data) {
            this.$emit('fullscreen', data);
        }
    },
    created() {
        const DAYS = [
            'sunday',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday'
        ];
        const MONTHS = [
            'january',
            'february',
            'march',
            'april',
            'may',
            'june',
            'july',
            'august',
            'september',
            'october',
            'november',
            'december'
        ];

        let day = new Date(this.$route.params.date);
        let today = new Date(day.getFullYear(), day.getMonth(), day.getDate() + this.dayOffset);

        this.dayText = this.$t('time.calendar.day', {
            day: this.$t(`days.${DAYS[ today.getDay() ]}.short`),
            month: this.$t(`months.${MONTHS[ today.getMonth() ]}.short`),
            dayN: today.getDate()
        });

        this.timer = setInterval(() => {
            let d = new Date()
            this.top = ( d.getHours() * 60 + d.getMinutes() ) / 60 * this.$agenda.HOUR_HEIGHT;
        }, 500);
    }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/mixins";

$day-height: 3em;
$bar-width: .2em;
$side-width: 4.5em;

div.Column {
    position: relative;
    width: 100%;

    // TODO: this does not work (include is temporary)
    @include tabletAndDesktop {
        &:not(:first-of-type) {
            margin-left: 1em;
        }
    }

    div.date {
        display: table;
        position: sticky;
        top: 0;
        width: 100%;
        height: $day-height;
        margin-bottom: 1em;
        z-index: 10;

        div.open {
            float: left;
            width: $day-height;
            height: $day-height;
            margin-right: 1em;
            background-color: red;

            @include tabletAndDesktop {
                display: none;
            }
        }

        div.text {
            display: flex;
            align-items: center;
            justify-content: center;
            float: left;
            width: 100%;
            height: 100%;
            background-color: var(--current-theme-darker);
            border-radius: .2em;
            font-size: 1.5em;

            &.is-today {
                background-color: var(--color-main);
            }

            @include phone {
                &.small {
                    width: calc(100% - #{$day-height});
                }
            }
        }
    }

    div.calendar {
        position: relative;
        display: grid;
        grid-template-columns: $side-width auto;
        height: 100%;

        div.current-time {
            $height: .1em;

            position: absolute;
            left: $side-width / 2;
            width: calc(100% - (#{$side-width} / 2));
            height: $height;
            background-color: var(--color-main);
            z-index: 1;

            &::before {
                content: '';
                position: absolute;
                top: -.375em + $height / 2;
                left: -.375em;
                width: .75em;
                height: .75em;
                background-color: var(--color-main);
                border-radius: 100px;
            }
        }

        div.timeline {
            position: relative;
            height: 100%;

            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: calc(50% - #{$bar-width} / 2);
                bottom: 0;
                width: $bar-width;
                background-color: var(--current-theme-text);
                opacity: .8;
            }
        }

        div.appointments-line {
            height: 100%;
            margin-left: 1em;
        }
    }
}
</style>
