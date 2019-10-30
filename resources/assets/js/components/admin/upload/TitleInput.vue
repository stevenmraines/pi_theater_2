<template>
    <div>
        <div class="form-group">
            <label for="title">* Title</label>
            <input
                class="form-control"
                v-model="title"
                @change="eventDispatcher.$emit('titleChange', title)"
                required
            />
        </div>
        <div class="text-danger mb-3" v-if="false">
            The title is required
        </div>
    </div>
</template>

<script>
    // TODO implement required warning
    export default {
        props: [
            'eventDispatcher',
            'title',
        ],
    }
</script>

<style scoped>

</style>