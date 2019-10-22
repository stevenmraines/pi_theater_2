<template>
    <div class="form-group">
        <label for="movie-summary">Summary</label>
        <textarea
            id="movie-summary"
            class="form-control"
            rows="4"
            v-model="summary"
        ></textarea>
        <div class="text-warning mb-3" v-if="false">
            The summary field is empty
        </div>
    </div>
</template>

<script>
    export default {
        props: ['summary']
    }
</script>

<style scoped>

</style>