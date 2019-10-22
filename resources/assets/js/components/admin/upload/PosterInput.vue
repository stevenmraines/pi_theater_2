<template>
    <div>
        <div class="form-group">
            <label for="movie-poster">Poster Image
                <a
                    v-bind:href="'https://www.google.com/search?q=' + title + '+poster&tbm=isch'"
                    target="_blank"
                >(search)</a>
            </label>
            <input
                type="file"
                id="movie-poster"
                class="form-control-file"
            />
        </div>
        <div class="text-danger mb-3" v-if="false">
            The poster image is required
        </div>
    </div>
</template>

<script>
    export default {
        props: ['filename', 'title']
    }
</script>

<style scoped>

</style>