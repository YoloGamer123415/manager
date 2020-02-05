<template>
    <div
        id="BusyBar"
        :style="{ 'background-color': $theme.current === 'light' ? '#252525' : '#000000' }"
    >
        <div
            class="inner-bar"
            :class="{ today: isToday }"
            :style="{ height: `${height}%` }"
            ref="innerBar" />
    </div>
</template>

<script>
export default {
    name: "BusyBar",
    props: {
        hours: Number,
        isToday: Boolean
    },
    methods: {
        setHours(hours) {
            if (hours < 0)
                hours = 0;
            else if (hours > 24)
                hours = 24;
            
            this.height = (hours / 24) * 100;
        }
    },
    data() {
        return {
            height: ((this.hours || 0) / 24) * 100
        }
    },
    mounted() {
        setInterval(() => {
            this.setHours(Math.floor(Math.random() * 24 + 1));
        }, 1000);
    }
}
</script>

<style lang="scss" scoped>
$width: .3em;

div#BusyBar {
    display: flex;
    align-items: flex-end;
    float: left;
    width: $width;
    height: calc(100% - 2 * #{$width});
    padding: $width;
    border-radius: 100px;
    
    &:not(:first-of-type) {
        margin-left: 1.5em;
    }
    
    div.inner-bar {
        width: $width;
        height: $width;
        background-color: var(--color-main);
        border-radius: 100px;
        transition: height .2s ease;
    }
    
    &.today div.inner-bar {
        filter: alpha(.5);
    }
}
</style>
