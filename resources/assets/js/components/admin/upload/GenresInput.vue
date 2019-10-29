<template>
    <div>
        <label for="genres">* Genres</label>
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
                        @change="eventDispatcher.$emit('genresChange', genres)"
                    />
                    <div class="input-group-append">
                        <button
                            class="btn btn-primary"
                            type="button"
                            @click="addGenre()"
                        >+</button>
                    </div>
                </div>
            </form>
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

        methods: {
            addGenre() {
                this.eventDispatcher.$emit('genresAdd');
            },
        },
    }
</script>

<style scoped>

</style>