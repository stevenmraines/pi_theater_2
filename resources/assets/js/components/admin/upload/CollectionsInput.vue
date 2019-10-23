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
                        class="form-control"
                        v-bind:value="collection.name"
                    />
                    <div class="input-group-append">
                        <button
                            class="btn btn-primary"
                            type="button"
                            v-on:click="addCollection()"
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
                collections: ['']
            };
        },

        methods: {
            addCollection() {
                this.collections.push('');
            },
        },
    }
</script>

<style scoped>

</style>