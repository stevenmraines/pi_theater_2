<template>
    <div>
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
                            @click="collectionSet(c)"
                        >
                            {{ c }}
                        </a>
                    </div>
                </div>
            </div>
            <input
                class="form-control"
                :value="collection"
                @change="collectionChange"
            />
            <div class="input-group-append">
                <button
                    class="btn btn-primary"
                    type="button"
                    @click="eventDispatcher.$emit('collectionAdd')"
                >
                    +
                </button>
                <button
                    class="btn btn-danger"
                    type="button"
                    @click="eventDispatcher.$emit('collectionRemove', index)"
                >
                    x
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'allCollections',
            'collection',
            'eventDispatcher',
            'index',
        ],

        methods: {
            collectionChange: function(event) {
                this.change(event.target.value);
            },

            collectionSet: function(collection) {
                this.change(collection);
            },

            change: function(value) {
                this.eventDispatcher.$emit('collectionChange', {
                    index: this.index,
                    value: value,
                });
            },
        },
    }
</script>