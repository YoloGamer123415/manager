<template>
    <div class="Notifications">
        <Notification
            :title="null"
            text="An unknown error occurred."
            type="error"
        />
    </div>
</template>

<script>
import Notification from "@/components/Notifications/Notification";
export default {
    name: "Notifications",
    components: {Notification},
    mounted() {
        this.$notifications.registerNotificationCallback(this.notification);
    },
    methods: {
        notification: function (options) {
            const titleKey = `notification.${options.key}.title`;
            const textKey = `notification.${options.key}.text`;
            const title = this.$t(titleKey) === titleKey
                ? null
                : this.$t(titleKey);
            const text = this.$t(textKey) === titleKey
                ? null
                : this.$t(textKey);
            
            // eslint-disable-next-line no-console
            console.log({
                title,
                text,
                type: options.type,
                time: options.time
            });
        }
    }
}
</script>

<style lang="scss" scoped>
div.Notifications {
    position: fixed;
    top: 0;
    right: 0;
}
</style>
