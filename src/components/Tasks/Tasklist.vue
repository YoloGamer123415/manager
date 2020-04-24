<template>
    <div class="Tasklist">
        <div v-if="title" class="title">
            <h1 v-text="title" />
        </div>

        <Task
            v-for="task in tasks"
            :key="task.id"
            :depth="depth ? depth + 1 : 1"
            :id="task.id"
            :title="task.title"
            :due="task.due"
            :childs="task.childs"
        />
    </div>
</template>

<script>
export default {
    name: 'Tasklist',
    components: {
        Task: () => import('@/components/Tasks/Task.vue')
    },
    props: {
        depth: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: false
        },
        tasks: {
            type: Array,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
$padding: 1em;

div.Tasklist {
    

    &:not(:first-of-type) {
        margin-top: 1em;
    }
}
</style>
