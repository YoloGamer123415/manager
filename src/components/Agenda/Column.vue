<template>
    <div
        class="Column"
        :style="{
            height: `${height}px`
        }"
    >
        <div class="date">

        </div>

        <div class="calendar">
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
        appointments: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            height: 24 * this.$agenda.HOUR_HEIGHT
        }
    }
}
</script>

<style lang="scss" scoped>
$bar-width: .2em;

div.Column {
    position: relative;
    width: 100%;

    &:not(:first-of-type) {
        margin-left: 1em;
    }

    div.date {
        
    }

    div.calendar {
        display: grid;
        grid-template-columns: 75px auto;
        height: 100%;

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
