<template>
    <div>
        <label for="genres">Genres</label>
        <div v-for="genre in genres">
            <form name="genre_form">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <button
                            type="button"
                            class="btn btn-primary dropdown-toggle"
                            data-toggle="dropdown"
                            data-target="#all-genres"
                        >
                            Options
                        </button>
                        <div class="dropdown-menu">
                            <a
                                id="all-genres"
                                href="javascript:void(0);"
                                class="dropdown-item"
                                v-for="g in allGenres"
                            >
                                {{ g.name }}
                            </a>
                        </div>
                    </div>
                    <input
                        id="genres"
                        class="form-control"
                        name="genres"
                        v-model="genre.name"
                        v-on:change="eventDispatcher.$emit('genresChange', genres)"
                    />
                    <div class="input-group-append">
                        <button
                            class="btn btn-primary"
                            type="button"
                            v-on:click="addGenre()"
                        >+</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'allGenres',
            'eventDispatcher',
        ],

        data() {
            return {
                genres: [
                    {
                        name: '',
                    },
                ],
            };
        },

        methods: {
            addGenre() {
                this.genres.push({ name: '' });
                this.eventDispatcher.$emit('genresChange', this.genres);
            },
        },
    }
</script>

<style scoped>

</style>