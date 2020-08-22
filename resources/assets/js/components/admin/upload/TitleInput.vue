<template>
    <div class="form-group">
        <label :for="id">* Title</label>
        <a
            :href="'https://www.imdb.com/find?q=' + value"
            target="_blank"
            v-if="search"
        >(IMDb Search)</a>
        <input
            :id="id"
            class="form-control"
            :value="value"
            @change="titleChange"
            @input="titleChange"
        />
    </div>
</template>

<script>
    export default {
        props: [
            'eventDispatcher',
            'search',
            'value',
        ],

        data() {
            return {
                id: null
            }
        },

        mounted() {
            this.id = this._uid;
        },

        methods: {
            titleChange(event) {
                this.eventDispatcher.$emit('titleChange', event.target.value);
            },
        },
    }
</script>