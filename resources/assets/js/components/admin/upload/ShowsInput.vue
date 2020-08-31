<template>
    <div class="form-group">
        <label :for="id">
            * Show
            <a :href="'https://www.imdb.com/find?q=' + currentShowTitle" target="_blank">
                (IMDb Search)
            </a>
        </label>
        <select
            :id="id"
            class="form-control"
            :value="value"
            @change="eventDispatcher.$emit('showChange', $event.target.value)"
        >
            <option
                v-for="show in shows"
                :key="show.id"
                :value="show.id"
            >
                {{ show.title }}
            </option>
        </select>
    </div>
</template>

<script>
    export default {
        props: [
            'eventDispatcher',
            'shows',
            'value',
        ],

        data() {
            return {
                id: null
            }
        },

        computed: {
            currentShowTitle() {
                var index = _.findIndex(this.shows, { 'id': this.value });

                if(index < 0) {
                    return '';
                }

                return this.shows[index].title;
            }
        },

        mounted() {
            this.id = this._uid;
        }
    }
</script>