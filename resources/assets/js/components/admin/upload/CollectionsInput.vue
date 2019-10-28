<template>
    <div>
        <label for="collections">Collections</label>
        <div v-for="collection in collections">
            <form name="col_form">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <button
                            type="button"
                            class="btn btn-primary dropdown-toggle"
                            data-toggle="dropdown"
                            data-target="#all-collections"
                        >
                            Options
                        </button>
                        <div class="dropdown-menu">
                            <a
                                id="all-collections"
                                href="javascript:void(0);"
                                class="dropdown-item"
                                v-for="c in allCollections"
                            >
                                {{ c.name }}
                            </a>
                        </div>
                    </div>
                    <input
                        id="collections"
                        type="text"
                        class="form-control"
                        v-model="collection.name"
                        v-on:change="eventDispatcher.$emit('collectionsChange', collections)"
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
        props: [
            'allCollections',
            'collections',
            'eventDispatcher',
        ],

        methods: {
            addCollection() {
                this.eventDispatcher.$emit('collectionsAdd');
            },
        },
    }
</script>

<style scoped>

</style>