<template>
    <div class="form-group">
        <label for="show">Show</label>
        <select
            id="show"
            class="form-control"
            v-model="show"
        >
            <option
                v-for="s in sortedShows"
                v-bind:key="s.id"
                v-bind:value="s.id"
            >{{ s.title }}</option>
        </select>
    </div>
</template>

<script>
    export default {
        props: ['shows'],

        data() {
            return {
                show: this.sortedShows[0],
            };
        },

        computed: {
            sortedShows() {
                return this.shows.sort(function(a, b) {
                    return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
                });
            }
        }
    }
</script>

<style scoped>

</style>