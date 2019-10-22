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
                        >
                            Options
                        </button>
                        <div class="dropdown-menu">
                            <a
                                href="#"
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
                        v-bind:value="genre.name"
                    />
                    <div class="input-group-append">
                        <button
                            class="btn btn-primary"
                            type="button"
                            v-on:click=""
                        >+</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['allGenres'],

        data() {
            return {
                genres: []
            };
        },

        created: function() {
            this.genres.push(this.allGenres[0]);
        },
    }
</script>

<style scoped>

</style>