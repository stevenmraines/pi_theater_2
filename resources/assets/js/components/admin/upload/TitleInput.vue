<template>
    <div>
        <div class="form-group">
            <label for="title">Title</label>
            <input
                id="title"
                class="form-control"
                name="title"
                v-model="title"
                required
            />
        </div>
        <div class="text-danger mb-3" v-if="false">
            The title is required
        </div>
    </div>
</template>

<script>
    export default {
        props: ['title'],

        created() {

        },
    }
</script>

<style scoped>

</style>