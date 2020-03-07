<template>
    <div class="form-group">
        <label for="year">
            * {{ label }}
            <a
                v-if="search"
                :href="'https://www.google.com/search?q=' + title + '+year+released'"
                target="_blank"
            >(Google)</a>
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
    export default {
        // TODO Might need to make separate MovieYearInput and ShowYearInput to add 'movie+year+released' to search query
        props: [
            'event',
            'eventDispatcher',
            'label',
            'max',
            'min',
            'search',
            'title',
            'value',
        ],

        methods: {
            yearChange(event) {
                this.eventDispatcher.$emit(this.event, event.target.value);
            },
        },
    }
</script>