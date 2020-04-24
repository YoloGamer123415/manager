<template>
    <div class="MailView">
        <div class="info">
            <h1 class="subject" v-text="subject" />

            <div v-if="message.files.length > 0" class="files">
                <span
                    v-for="file in message.files"
                    :key="file.id"
                    class="file"
                    @click="downloadFile(file.id)"
                >
                    <font-awesome-icon :icon="['far', 'file']" class="icon" />

                    {{ file.name }}
                </span>
            </div>
        </div>

        <div class="text" v-html="message.html || message.text" />
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
                preview: null,
                text: null,
                html: null,
                files: []
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
        },

        downloadFile() {
            this.$notifications.newNotification({
                type: 'info',
                key: 'notImplemented'
            });
        }
    },
    mounted() {
        EventBus.on('mail-view', id => {
            let mail = this.$mail.getMail(id);

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
@import "src/assets/style/mixins";

div.MailView {
    height: calc(100% - 2 * 1em);

    div.info {
        

        div.files {
            margin: 1em 0;
            font-size: .75em;
            user-select: none;
    
            span.file {
                padding: .25em 1em;
                border: .1em solid #aaaaaa;
                border-radius: 100px;
                cursor: pointer;
    
                .icon {
                    margin-right: .3em;
                }
    
                @include desktop {
                    transition: border-color .3s ease;
    
                    &:hover {
                        border-color: var(--color-main);
                    }
                }
            }
        }
    }

    div.text {
        background-color: var(--theme-light-background);
    }
}
</style>
