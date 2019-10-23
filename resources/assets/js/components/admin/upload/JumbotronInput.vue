<template>
    <div class="form-group">
        <label for="movie-jumbotron">
            Jumbotron Image
        </label>
        <input
            type="file"
            id="movie-jumbotron"
            class="form-control-file"
        />
    </div>
</template>

<script>
    export default {
        props: ['filename']
    }
</script>

<style scoped>

</style>