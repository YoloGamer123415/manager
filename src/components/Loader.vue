<template>
    <div
        class="Loader"
        :style="{ fulldark }"
    >
        <div class="loader-inner" />
    </div>
</template>

<script>
export default {
    name: "Loader",
    props: {
        fulldark: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    created() {
        this.$once('stop', () => {
            this.$destroy();
        })
    },
    beforeDestroy() {
        this.$el.parentNode.removeChild(this.$el);
    }
}
</script>

<style lang="scss" scoped>
div.Loader {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--current-theme-darker);
    filter: alpha(.75);
    
    &.fulldark {
        background-color: var(--current-theme-darker);
    }

    div.loader-inner {
        width: 3em;
        height: 3em;
        border-top: 2px solid var(--color-main);
        border-right: 2px solid transparent;
        border-bottom: 0 solid transparent;
        border-left: 0 solid var(--color-main);
        border-radius: 100px;
        animation: spin 1s ease infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
}
</style>