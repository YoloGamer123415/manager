<template>
    <div id="Mail">
        <MailSide ref="mail-side" :unread="totalUnread">
            <MailItem
                id="hahaidk"
                subject="Haha test"
                short="Haha idk man"
                :received="new Date()"
                :from="{
                    name: 'Test',
                    mail: 'Test@example.com'
                }"
            />

            <MailItem
                id="help"
                subject="Haha test 2"
                short="Haha idk man 2"
                :received="new Date()"
                :from="{
                    mail: 'NogeenTest@example.com'
                }"
            />
        </MailSide>

        <MailView />
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
            totalUnread: 2
        }
    },
    created() {
        // eslint-disable-next-line no-console
        console.log('yeet');
        this.$mail.getUnreadMails();
    }
}
</script>

<style lang="scss" scoped>
div#Mail {
    display: grid;
    width: calc(100% - 2 * 1em);
    grid-template-columns: calc(100% / 3) calc(100% / 3 * 2);
    gap: 1em;
}
</style>
