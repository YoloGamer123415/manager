<template>
    <div
        class="Notification"
        ref="notification"
        :class="type"
        :style="{
            color
        }"
    >
        <p
            v-if="text"
            class="text"
            v-html="text"
        />
        
        <slot v-else />
    </div>
</template>

<script>
export default {
    name: "Notification",
    props: {
        text: {
            type: String,
            required: false
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
            color: null,
            animationTime: 300
        }
    },
    created() {
        const black = '#000000';
        const white = '#ffffff';

        if (this.type === 'info') {
            if (this.$contrastChecker.check(this.$theme.mainColor, black))
                this.color = black;
            else if (this.$contrastChecker.check(this.$theme.mainColor, white))
                this.color = white;
        }
    },
    mounted() {
        setTimeout(() => {
            this.$refs.notification.classList.add('removing');
            
            setTimeout(() => {
                this.$destroy();
            }, this.animationTime + 50);
        }, this.time + this.animationTime);
    },
    beforeDestroy() {
        this.$el.parentNode.removeChild(this.$el);
    }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/mixins";

$padding: .75em;
$border-width: 2px;
$border-radius: 5px;
$max-height: 3 * 1em + 1.9 * $padding; // 3 lines of text + padding

div.Notification {
    position: relative;
    width: calc(100% - 2 * #{$padding});
    max-height: $max-height;
    margin-top: 1em;
    padding: $padding;
    border-radius: $border-radius;
    box-shadow: 1px 3px 5px 0 rgba($color: #000000, $alpha: .25);
    overflow: hidden;
    animation: in .3s ease-out;
    
    &.removing {
        margin-left: calc(100% + #{$padding} + 1em);
        animation: out .3s ease-in;
    }
    
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: transparent;
        border: #{$border-width} solid var(--color-main);
        border-radius: $border-radius;
        filter: brightness(75%);
        z-index: 1;
    }
    
    @include phone {
        margin-top: 0;
        margin-bottom: .5em;
    }
    
    @include desktop {
        transition: max-height .3s ease;
        
        &:hover {
            max-height: calc(100vh - 2 * (1em + #{$padding}));
        }
    }
    
    &.info {
        background-color: var(--color-main);
    }
    
    &.error {
        background-color: var(--color-error);
    }
    
    &.success {
        background-color: var(--color-success);
    }
    
    @keyframes in {
        0% {
            margin-left: calc(100% + #{$padding} + 1em);
        }
        
        100% {
            margin-left: 0;
        }
    }
    
    @keyframes out {
        0% {
            margin-left: 0;
        }
        
        100% {
            margin-left: calc(100% + #{$padding} + 1em);
        }
    }
}
</style>
