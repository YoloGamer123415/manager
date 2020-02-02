<template>
    <div id="Navigation">
        <router-link to="/home" class="link home">
            <div class="icon">
                <font-awesome-icon icon="home" />
            </div>
        
            <div class="text">
                <span v-text="$t('navigation.home')" />
            </div>
        </router-link>
    
        <router-link to="/agenda" class="link agenda">
            <div class="icon">
                <font-awesome-icon icon="calendar-alt" />
            </div>
        
            <div class="text">
                <span v-text="$t('navigation.agenda')" />
            </div>
        </router-link>
    
        <router-link to="/mail" class="link mail">
            <div class="icon">
                <font-awesome-icon icon="envelope-open" />
            </div>
        
            <div class="text">
                <span v-text="$t('navigation.mail')" />
            </div>
        </router-link>
    
        <router-link to="/tasks" class="link tasks">
            <div class="icon">
                <font-awesome-icon icon="tasks" />
            </div>
        
            <div class="text">
                <span v-text="$t('navigation.tasks')" />
            </div>
        </router-link>
        
        <router-link to="/settings" class="link settings">
            <div class="icon">
                <font-awesome-icon icon="cog" />
            </div>
            
            <div class="text">
                <span v-text="$t('navigation.settings')" />
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "Navigation"
}
</script>

<style lang="scss" scoped>
$width: 3em;

div#Navigation {
    display: flex;
    justify-content: center;
    
    .link {
        display: inline-block;
        width: $width;
        height: $width;
        overflow: hidden;
        border-radius: 100px;
        text-decoration: none;
        filter: alpha(.5);
        transition: filter .3s ease;
        
        // TODO: blijft dit 1200px?
        @media only screen and (min-width: 1200px) {
            transition:
                filter .3s ease,
                width .3s ease;
        }
        
        &:not(:first-of-type) {
            margin-left: $width / 2;
        }
        
        &.router-link-active {
            filter: alpha(1);
            
            // TODO: blijft dit 1200px?
            @media only screen and (min-width: 1200px) {
                width: $width * 3.25;
                overflow: visible;
            }
        }
        
        &.home {
            background-color: var(--main-color);
        }
        
        &.agenda {
            background-color: #1A73E8;
        }
        
        &.mail {
            background-color: #C5221F;
        }
        
        &.tasks {
            background-color: #F5BA15;
        }
        
        &.settings {
            background-color: var(--main-color);
        }
        
        div.icon {
            display: flex;
            float: left;
            align-items: center;
            justify-content: center;
            width: $width;
            height: $width;
            color: #252525;
        }
        
        div.text {
            display: flex;
            align-items: center;
            height: 100%;
            padding-right: 1em;
            color: #252525;
        }
    }
}
</style>
