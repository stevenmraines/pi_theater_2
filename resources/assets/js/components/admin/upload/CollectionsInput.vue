<template>
    <div>
        <label for="collections">Collections</label>
        <div v-for="(collection, index) in collections">
            <form name="col_form">
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
                                    v-for="c in allCollections"
                                    @click="setCollection(index, c)"
                                >
                                    {{ c.name }}
                                </a>
                            </div>
                        </div>
                    </div>
                    <input
                        class="form-control"
                        v-model="collection.name"
                        @change="changeCollection"
                    />
                    <div class="input-group-append">
                        <button
                            class="btn btn-primary"
                            type="button"
                            @click="addCollection"
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
                this.$forceUpdate();
            },

            changeCollection() {
                this.eventDispatcher.$emit('collectionsChange', this.collections);
                this.$forceUpdate();
            },

            setCollection(index, collection) {
                this.eventDispatcher.$emit('collectionsSet', {
                    index: index,
                    collection: collection,
                });

                this.$forceUpdate();
            },
        },
    }
</script>

<style scoped>

</style>