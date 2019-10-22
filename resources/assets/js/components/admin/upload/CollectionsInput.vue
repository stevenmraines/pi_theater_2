<template>
    <div>
        <label for="movie-collections">Collections</label>
        <div v-for="collection in collections">
            <form name="col_form">
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
                                href="javascript:void(0);"
                                class="dropdown-item"
                                v-for="c in allCollections"
                            >
                                {{ c.name }}
                            </a>
                        </div>
                    </div>
                    <input
                        type="text"
                        id="movie-collections"
                        class="form-control"
                        v-bind:value="collection.name"
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
        props: ['allCollections'],

        data() {
            return {
                collections: []
            };
        },

        created: function() {
            this.collections.push(this.allCollections[0]);
        },
    }
</script>

<style scoped>

</style>