<template>
    <div class="form-group">
        <label for="jumbotron">
            Jumbotron Image
        </label>
        <input
            type="file"
            id="jumbotron"
            class="form-control-file"
            :value="jumbotron"
            @change="eventDispatcher.$emit('jumbotronChange', $event.target.value)"
        />
    </div>
</template>

<script>
    // TODO figure out how to do bootstrap labels without IDs
    export default {
        props: [
            'eventDispatcher',
            'jumbotron',
        ],
    }
</script>

<style scoped>

</style>