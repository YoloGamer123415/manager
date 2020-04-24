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
        busy: Number,
        isToday: Boolean
    },
    watch: {
        busy() {
            this.setHours(this.busy);
        }
    },
    methods: {
        setHours(busy) {
            if (busy < 0)
                busy = 0;
            else if (busy > 24)
                busy = 24;
            
            this.height = (busy / 24) * 100;
        }
    },
    data() {
        return {
            height: ((this.busy || 0) / 24) * 100
        }
    },
    created() {
        this.setHours(this.busy);
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
