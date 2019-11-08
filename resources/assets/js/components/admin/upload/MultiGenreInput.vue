<template>
    <div class="form-group">
        <label for="genres">* Genres</label>
        <genre-input
            id="genres"
            v-for="(genre, index) in genres"
            :allGenres="allGenres"
            :eventDispatcher="eventDispatcher"
            :index="index"
            :key="index"
            :value="genre"
        ></genre-input>
    </div>
</template>

<script>
    export default {
        props: [
            'allGenres',
            'eventDispatcher',
            'genres',
        ],
    }
</script>