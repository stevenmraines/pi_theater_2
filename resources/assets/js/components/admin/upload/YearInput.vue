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
            :value="year"
            @change="eventDispatcher.$emit('yearChange', $event.target.value)"
        />
    </div>
</template>

<script>
    export default {
        props: [
            'eventDispatcher',
            'label',
            'min',
            'max',
            'search',
            'title',
            'year',
        ],
    }
</script>