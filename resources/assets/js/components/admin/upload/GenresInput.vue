<template>
    <div>
        <label for="genres">* Genres</label>
        <div v-for="(genre, index) in genres">
            <form name="genre_form">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <div class="dropdown">
                            <button
                                type="button"
                                class="btn btn-primary dropdown-toggle"
                                data-toggle="dropdown"
                            >
                                Options
                            </button>
                            <div class="dropdown-menu">
                                <a
                                    href="javascript:void(0);"
                                    class="dropdown-item"
                                    v-for="g in allGenres"
                                    @click="setGenre(index, g)"
                                >
                                    {{ g.name }}
                                </a>
                            </div>
                        </div>
                    </div>
                    <input
                        class="form-control"
                        v-model="genre.name"
                        @change="changeGenre"
                    />
                    <div class="input-group-append">
                        <button
                            class="btn btn-primary"
                            type="button"
                            @click="addGenre"
                        >+</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    // TODO implement required warning
    // TODO figure out how to make this work without v-model
    export default {
        props: [
            'allGenres',
            'eventDispatcher',
            'genres',
        ],

        methods: {
            addGenre() {
                this.eventDispatcher.$emit('genresAdd');
                this.$forceUpdate();
            },

            changeGenre() {
                this.eventDispatcher.$emit('genresChange', this.genres);
                this.$forceUpdate();
            },

            setGenre(index, genre) {
                this.eventDispatcher.$emit('genresSet', {
                    index: index,
                    genre: genre,
                });

                this.$forceUpdate();
            },
        },
    }
</script>

<style scoped>

</style>