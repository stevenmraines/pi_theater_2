<template>
    <div>
        <label for="genres">* Genres</label>
        <div id="genres">
            <genre-input
                v-for="(genre, index) in genres"
                :allGenres="allGenres"
                :eventDispatcher="eventDispatcher"
                :genre="genre"
                :index="index"
                :key="index"
            ></genre-input>
        </div>
    </div>
</template>

<script>
    // TODO implement required warning
    export default {
        props: [
            'allGenres',
            'eventDispatcher',
            'genres',
        ],
    }
</script>

<style scoped>

</style>