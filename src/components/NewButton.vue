<template>
    <div
        class="NewButton"
        :class="{
            'is-toggled': isToggled
        }"
    >
        <router-link
            to="/tasks/new/"
            class="side-button normal tasks"
        >
            <font-awesome-icon icon="tasks" class="icon" />
        </router-link>
        
        <router-link
            to="/mail/new/"
            class="side-button normal mail"
        >
            <font-awesome-icon icon="envelope-open" class="icon" />
        </router-link>
        
        <router-link
            to="/agenda/new/"
            class="side-button normal agenda"
        >
            <font-awesome-icon icon="calendar-alt" class="icon" />
        </router-link>
    
        <a
            href="#"
            role="button"
            class="main-button"
            @click="mainClick"
        >
            <font-awesome-icon
                icon="plus"
                class="icon"
                :style="{
                    color: iconColor
                }"
            />
        </a>
    </div>
</template>

<script>
export default {
    name: "NewButton",
    data() {
        return {
            iconColor: null,
            isToggled: false
        }
    },
    created() {
        const black = '#000000';
        const white = '#ffffff';

        if (this.$contrastChecker.check(this.$theme.mainColor, black))
            this.iconColor = black;
        else if (this.$contrastChecker.check(this.$theme.mainColor, white))
            this.iconColor = white;
    },
    methods: {
        mainClick () {
            this.isToggled = !this.isToggled;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/mixins";

$nav-height: 3em;
$gap: 1em;
$button-padding: 2em;
$button-height: 3em;

div.NewButton {
    position: fixed;
    bottom: $button-padding;
    right: $button-padding;
    width: $button-height;
    z-index: 100;
    
    @include phone {
        bottom: $nav-height + $gap + $button-padding;
    }
    
    &.is-toggled {
        a.side-button {
            margin: 0 auto 1em;
            
            svg {
                display: block;
            }
        }
        
        a.main-button .icon {
            transform: rotate(#{.25 * 180deg});
        }
    }
    
    a.side-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: $button-height * .85;
        height: $button-height * .85;
        margin: 0 auto #{-$button-height * .85};
        color: #000000;
        border-radius: 100px;
        box-shadow: 1px 3px 5px 0 rgba(#000000, .25);
        transition: margin .3s ease;
        z-index: -1;
        
        &.agenda {
            background-color: var(--color-agenda);
        }
        
        &.mail {
            background-color: var(--color-mail);
        }
        
        &.tasks {
            background-color: var(--color-tasks);
        }
        
        svg {
            display: none;
        }
    }
    
    a.main-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: $button-height;
        height: $button-height;
        color: #000000;
        background-color: var(--color-main);
        box-shadow: 1px 3px 5px 0 rgba(#000000, .25);
        border-radius: 100px;
        outline: none;
        cursor: pointer;
        z-index: 1;
    
        .icon {
            transform: rotate(0deg);
            transition: transform .3s ease;
        }
    }
}
</style>
