<template>
    <div class="Notifications" ref="notifications">
    
    </div>
</template>

<script>
import Vue from "vue";
import i18n from "@/plugins/i18n";
import Notification from "@/components/Notifications/Notification";

export default {
    name: "Notifications",
    mounted() {
        this.$notifications.registerNotificationCallback(this.notification);
    },
    methods: {
        notification (options) {
            const key = `notification.${options.key}.text`;
            const text = this.$t(key) === key
                ? null
                : this.$t(key);
            
            const ELEMENT = document.createElement('div');
            ELEMENT.id = this.parseId(Date.now().toString());
            this.$refs.notifications.appendChild(ELEMENT);
            
            const COMPONENT = Vue.extend(Notification);
            const INSTANCE = new COMPONENT({
                i18n,
                propsData: {
                    text,
                    type: options.type,
                    time: options.time
                }
            });
            
            INSTANCE.$mount(`#${ELEMENT.id}`);
        },
        /**
         * Transform the numbers into letters.
         * @param {string} id
         * @returns {string}
         */
        parseId (id) {
            //               0123456789
            const LETTERS = 'abcdefghij';
            let ret = '';
            
            if (typeof id == "number")
                id = id.toString();
            
            for (let i = 0; i < id.length; i++)
                ret += LETTERS[parseInt(id[i])];
            
            return ret;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/mixins";

div.Notifications {
    position: fixed;
    top: 0;
    right: 0;
    padding: 0 1em;
    z-index: 100;
    
    @include phone {
        top: unset;
        // TODO: doen we hem hier aan de onderkant?
        bottom: 0;
        left: 0;
        width: calc(100% - 2 * .5em);
        padding: 0 .5em;
    }
    
    @include tablet {
        width: 40%;
    }
    
    @include desktop {
        width: 20%;
    }
}
</style>
