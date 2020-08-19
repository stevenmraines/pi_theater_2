<template>
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
                        :key="index"
                        href="javascript:void(0);"
                        class="dropdown-item"
                        v-for="(c, index) in allCollections"
                        @click="collectionSet(c)"
                    >
                        {{ c }}
                    </a>
                </div>
            </div>
        </div>

        <input
            class="form-control"
            :value="value"
            @change="collectionChange"
            @input="collectionChange"
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
</template>

<script>
    // TODO abstract this and GenreInput to another more generic component that handles both
    export default {
        props: [
            'allCollections',
            'eventDispatcher',
            'index',
            'value',
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