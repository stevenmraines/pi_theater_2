<template>
    <div class="form-group">
        <label :for="id">IMDb Search</label>
        <select
            :id="id"
            class="form-control"
            :value="value"
            @change="eventDispatcher.$emit('imdbSearchChange', $event.target.value)"
        >
            <option
                v-for="result in results.d"
                :key="result.id"
                :value="result.id"
            >
                {{ result.l }} ({{ result.yr ? result.yr : result.y }})
            </option>
        </select>
    </div>
</template>

<script>
    export default {
        props: [
            'eventDispatcher',
            'results',
            'value',
        ],

        data() {
            return {
                id: null
            }
        },

        mounted() {
            this.id = this._uid;
        }
    }
</script>