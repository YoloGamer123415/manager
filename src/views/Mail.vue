<template>
    <div id="Mail">
        <div class="side-view">
            <MailSide ref="mail-side" :unread="totalUnread">
                <MailItem
                    v-for="mail in mails"
                    :key="mail.id"
                    :id="mail.id"
                    :subject="mail.subject"
                    :received="mail.received"
                    :from="mail.from"
                    :preview="mail.message.preview"
                    :files="mail.message.files"
                />
            </MailSide>
        </div>

        <div class="view-big">
            <MailView />
        </div>
    </div>
</template>

<script>
import MailView from "@/components/Mail/View.vue";
import MailSide from "@/components/Mail/Side";
import MailItem from "@/components/Mail/Side/MailItem.vue";

export default {
    name: "Mail",
    components: {MailView,MailSide,MailItem},
    data() {
        return {
            mails: [],
            totalUnread: 0
        }
    },
    async created() {
        try {
            // eslint-disable-next-line no-console
            console.time('mail');
            let res = await this.$mail.getUnreadMails();

            // eslint-disable-next-line no-console
            console.timeEnd('mail');
            this.mails = res;
            this.totalUnread = res.length;
        } catch (e) {
            //eslint-disable-next-line no-console
            console.warn(e);

            this.$notifications.newNotification({
                type: 'error',
                key: 'unknown'
            });
        }
    }
}
</script>

<style lang="scss" scoped>
div#Mail {
    display: grid;
    width: calc(100% - 2 * 1em);
    grid-template:
        'side view' 100%
        / calc(100% / 3) calc(100% / 3 * 2);
    gap: 1em;

    div.side-view {
        grid-area: side;
        overflow-y: auto;
    }

    div.view-big {
        grid-area: view;
        overflow-y: auto;
    }
}
</style>
