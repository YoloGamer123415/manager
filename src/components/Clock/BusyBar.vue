<template>
    <div id="BusyBar">
        <div
            class="inner-bar"
            :class="{ today: isToday }"
            ref="innerBar" />
    </div>
</template>

<script>
export default {
    name: "BusyBar",
    props: {
        size: Number,
        isToday: Boolean
    },
    data() {
        return {
            height: 1
        }
    },
    mounted() {
        setInterval(() => {
            this.height = Math.round(Math.random() * 100) + 1;
            
            this.$refs.innerBar.style.height = `${this.height}%`;
        }, 1000);
    }
}
</script>

<style lang="scss" scoped>
$width: .3em;
$main-color: #00E6E6;

div#BusyBar {
    display: flex;
    align-items: flex-end;
    float: left;
    width: $width;
    height: calc(100% - 2 * #{$width});
    padding: $width;
    background-color: #000000;
    border-radius: 100px;
    
    &:not(:first-of-type) {
        margin-left: 1.5em;
    }
    
    div.inner-bar {
        width: $width;
        height: $width;
        background-color: $main-color;
        border-radius: 100px;
        transition: height .2s ease;
    }
    
    &.today div.inner-bar {
        filter: alpha(.5);
    }
}
</style>
