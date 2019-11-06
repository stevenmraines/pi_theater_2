<template>
    <div>
        <div class="form-group">
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
        <div class="text-danger mb-3" v-if="false">
            The genres are required
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