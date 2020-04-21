<!-- TODO: zorg er voor dat overflow fatsoenlijk wordt weergegeven, met de icoontjes rechts naast de titel -->

<template>
    <div
        class="Appointment"
        ref="appointment"
        :style="{
            '--Appointment-color-foreground': color.foreground || color.background,
            '--Appointment-color-background': color.background,

            top: `${getCorrectOffset()}px`,
            height: `${getCorrectHeight()}px`,
            'background-color': $theme.current === 'dark' ? 'var(--current-theme-lighter)' : 'var(--current-theme-darker)'
        }"
        :data-time="getTimeShort()"
        @click="fullscreen()"
    >
        <p class="title" v-text="title" />

        <div class="time">
            <div class="icon">
                <font-awesome-icon :icon="['far', 'clock']" />
            </div>

            <p class="text" v-text="getTimeStartEnd()" />
        </div>

        <div v-if="location" class="location">
            <div class="icon">
                <font-awesome-icon icon="map-marker-alt" />
            </div>

            <p class="text" v-text="location" />
        </div>

        <div v-if="description" class="description">
            <div class="i">
                <font-awesome-icon icon="align-left" />
            </div>

            <p class="text" v-text="description" />
        </div>
    </div>
</template>

<script>
import EventBus from "@/EventBus";

const HOUR_HEIGHT = 250;
const MINUTE_HEIGHT_MODIFIER = HOUR_HEIGHT / 60;

export default {
    name: 'Appointment',
    props: {
        title: String,
        description: {
            type: String,
            required: false
        },
        location: {
            type: String,
            required: false
        },
        color: {
            foreground: String,
            background: String
        },
        time: {
            start: Date,
            end: Date
        }
    },
    methods: {
        getTimeShort() {
            return this.$t('time.calendar', {
                hours: this.time.start.getHours().toString().padStart(2, '0'),
                minutes: this.time.start.getMinutes().toString().padStart(2, '0')
            });
        },

        getTimeStartEnd() {
            let res = '';

            res += this.$t('time.calendar', {
                hours: this.time.start.getHours().toString().padStart(2, '0'),
                minutes: this.time.start.getMinutes().toString().padStart(2, '0')
            });

            res += ' - ';

            res += this.$t('time.calendar', {
                hours: this.time.end.getHours().toString().padStart(2, '0'),
                minutes: this.time.end.getMinutes().toString().padStart(2, '0')
            });

            return res;
        },

        getCorrectOffset() {
            let hours = this.time.start.getHours();
            let minutes = this.time.start.getMinutes();
            let totalMinutes = hours * 60 + minutes;

            return totalMinutes * MINUTE_HEIGHT_MODIFIER;
        }, 

        getCorrectHeight() {
            let hours = this.time.end.getHours() - this.time.start.getHours();
            let minutes = this.time.end.getMinutes() - this.time.start.getMinutes();
            let totalMinutes = hours * 60 + minutes;

            return totalMinutes * MINUTE_HEIGHT_MODIFIER;
        },

        fullscreen() {
            EventBus.emit('appointment-fullscreen', {
                title: this.title,
                description: this.description,
                location: this.location,
                color: this.color,
                time: this.time
            });
        }
    }
}
</script>

<style lang="scss" scoped>
$padding: 1em;
$width: 75px;
$circle: .75em;
$bar-width: .2em;

div.Appointment {
    position: absolute;
    width: calc(100% - #{$width} - 3 * #{$padding}); // a third time because the elements get a margin left from the Column
    padding: $padding / 2 $padding;
    color: var(--current-theme-text);
    border-radius: .3em;
    cursor: pointer;

    // TODO: plak dat stomme lijntje er op een of andere manier er in
    &::before {
        content: attr(data-time);
        position: absolute;
        top: 0;
        left: calc((#{$width} + #{$padding}) / -1);
        display: flex;
        justify-content: center;
        align-items: flex-end;
        width: $width;
        height: $width;
        padding: .25em 0;
        background-color: var(--current-theme-background);
    }

    &::after {
        content: '';
        position: absolute;
        top: $circle;
        left: calc(#{$width} / -2 - #{$circle} - #{$padding});
        width: $circle;
        height: $circle;
        background-color: var(--Appointment-color-foreground);
        border-width: $circle / 2;
        border-style: solid;
        border-color: var(--Appointment-color-background);
        border-radius: 100px;
        z-index: 1;
    }

    p.title {
        display: table;
        position: sticky;
        top: 0;
        width: 100%;
        background-color: var(--current-theme-lighter);
        font-size: 1.5em;
        font-weight: bold;
    }

    div.time,
    div.location,
    div.description {
        display: grid;
        grid-template-columns: 1.5em auto;

        &:not(:first-of-type) {
            margin-top: .25em;
        }
    }
}
</style>
