<template>
    <div id="Mail">
        <p>Mail</p>

        <button @click="$notifications.newNotification({
            key: 'test',
            type: 'info'
        })">Yeet</button>
    </div>
</template>

<script>
export default {
    name: "Mail"
}
</script>

<style lang="scss" scoped>
div#Mail {
    
}
</style>
