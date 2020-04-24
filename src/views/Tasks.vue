<template>
    <div id="Tasks">
        <Tasklist
            v-for="tasklist in tasklists"
            :key="tasklist.id"
            :title="tasklist.title"
            :tasks="tasklist.tasks"
        />
    </div>
</template>

<script>
import Tasklist from "@/components/Tasks/Tasklist.vue";

export default {
    name: "Tasks",
    components: {Tasklist},
    data() {
        return {
            tasklists: [/* {
                id: 'haha-help',
                title: 'Mijn taken',
                tasks: [{
                    "id": "am9rU3pzcVR5OWZqVjJVZA",
                    "title": "wtf google",
                    "childs": []
                },
                {
                    "id": "R29rVFhISG5CdDA0YWdUVg",
                    "title": "nice",
                    "childs": [{
                        "id": "VDRydXZCVWZUU2I5X054Zg",
                        "title": "blabla",
                        "due": new Date("2020-04-08T00:00:00.000Z"),
                        "childs": []
                    }]
                }]
            }, {
                id: 'haha-help-2',
                title: 'inspiratieloos',
                tasks: [{
                    "id": "am9rU3pzcVR5OWZqVjJVZAaw",
                    "title": "wtf google :(",
                    "childs": []
                },
                {
                    "id": "R29rVFhISG5CdDA0YWdUVgaw",
                    "title": "nice aw",
                    "childs": [{
                        "id": "VDRydXZCVWZUU2I5X054Zgaw",
                        "title": "blabla aw",
                        "due": new Date("2020-04-08T00:00:00.000Z"),
                        "childs": []
                    }]
                }]
            } */]
        }
    },
    created() {
        this.$tasks.getTasks()
            .then(lists => {
                // TODO: op de een of andere manier is een Date een string ipv een Date
                this.tasklists = lists;
            })
            .catch(e => {
                //eslint-disable-next-line no-console
                console.warn(e);

                this.$notifications.newNotification({
                    type: 'error',
                    key: 'unknown'
                });
            });
    }
}
</script>

<style lang="scss" scoped>
div#Tasks {
    > div.Tasklist:not(:first-of-type) {
        margin-top: 2em;
    }
}
</style>
