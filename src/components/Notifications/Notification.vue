<template>
    <div
        class="Notification"
        :class="type"
        :style="{
            color
        }"
    >
        <p class="title" v-text="title" />
        
        <p class="text" v-html="text" />
    </div>
</template>

<script>
export default {
    name: "Notification",
    props: {
        title: {
            type: String,
            required: false,
            default: null
        },
        text: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: false,
            default: 'info'
        },
        time: {
            type: Number,
            required: false,
            default: 3000
        }
    },
    data() {
        return {
            color: null
        }
    },
    created() {
        const black = '#000000';
        const white = '#ffffff';

        // eslint-disable-next-line no-console
        console.log(this);

        if (this.$contrastChecker.check(this.$theme.mainColor, black))
            this.color = black;
        else if (this.$contrastChecker.check(this.$theme.mainColor, white))
            this.color = white;
    },
    mounted() {
        // eslint-disable-next-line no-console
        console.log({
            title: this.title,
            text: this.text,
            type: this.type,
            time: this.time
        })
    }
}
</script>

<style lang="scss" scoped>
div.Notification {
    &.info {
        background-color: var(--color-main);
    }
    
    &.error {
        background-color: var(--color-error);
    }
    
    &.success {
        background-color: var(--color-success);
    }
}
</style>
