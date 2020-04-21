<template>
    <div class="MailView">
        <div class="info">
            <h1 class="subject" v-text="subject" />
        </div>

        <div class="text" v-html="message.html" />
    </div>
</template>

<script>
import EventBus from "@/EventBus";

export default {
    name: 'MailView',
    data() {
        return {
            id: null,
            received: null,
            to: [],
            from: {
                name: null,
                mail: null
            },
            subject: null,
            message: {
                short: null,
                text: null,
                html: null
            }
        }
    },
    methods: {
        /**
         * @param {Object} obj
         * @returns {String}
         */
        formatUserMail({name, mail}) {
            const ELEM_MAIL = `<a href="mailto:${mail}">${mail}</a>`;
            const DELIM = name ? ['&lt;', '&gt;'] : ['', ''];
            let res = '';

            if (name)
                res += name;

            res += DELIM[0];
            res += ELEM_MAIL;
            res += DELIM[1];

            return res;
        }
    },
    mounted() {
        EventBus.on('mail-view', id => {
            let mail = this.$mail.getMail(id);
            // eslint-disable-next-line no-console
            console.log(mail);

            this.id = id;
            this.received = mail.received;
            this.to = mail.to;
            this.from = mail.from;
            this.subject = mail.subject;
            this.message = mail.message;
        });
    }
}
</script>

<style lang="scss" scoped>
div.MailView {
    background-color: blue;
}
</style>
