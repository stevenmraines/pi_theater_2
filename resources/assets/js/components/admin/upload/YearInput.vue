<template>
    <div class="form-group">
        <label for="year">
            * {{ label }}
            <a
                v-if="search"
                :href="'https://www.google.com/search?q=' + title + '+year+released'"
                target="_blank"
            >(search)</a>
        </label>
        <input
            type="number"
            id="year"
            class="form-control"
            :min="min"
            :max="max"
            :value="value"
            @change="yearChange"
            @input="yearChange"
        />
    </div>
</template>

<script>
    // TODO Need to pass min / max as props so that year end can take 0 for shows that haven't ended
    export default {
        props: [
            'event',
            'eventDispatcher',
            'label',
            'search',
            'title',
            'value',
        ],

        data() {
            return {
                max: new Date().getFullYear(),
                min: 1900,
            };
        },

        methods: {
            yearChange(event) {
                this.eventDispatcher.$emit(this.event, event.target.value);
            },
        },
    }
</script>