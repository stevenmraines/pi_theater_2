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
                        v-for="(g, index) in allGenres"
                        @click="genreSet(g)"
                    >
                        {{ g }}
                    </a>
                </div>
            </div>
        </div>

        <input
            class="form-control"
            :value="value"
            @change="genreChange"
            @input="genreChange"
        />

        <div class="input-group-append">
            <button
                class="btn btn-primary"
                type="button"
                @click="eventDispatcher.$emit('genreAdd')"
            >
                +
            </button>

            <button
                class="btn btn-danger"
                type="button"
                @click="eventDispatcher.$emit('genreRemove', index)"
            >
                x
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'allGenres',
            'eventDispatcher',
            'index',
            'value',
        ],

        methods: {
            genreChange: function(event) {
                this.change(event.target.value);
            },

            genreSet: function(genre) {
                this.change(genre);
            },

            change: function(value) {
                this.eventDispatcher.$emit('genreChange', {
                    index: this.index,
                    value: value,
                });
            },
        },
    }
</script>