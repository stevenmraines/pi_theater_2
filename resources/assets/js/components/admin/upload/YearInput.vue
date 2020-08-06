<template>
    <div class="form-group">
        <label for="year">
            * {{ label }}
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
        props: [
            'event',
            'eventDispatcher',
            'label',
            'max',
            'min',
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