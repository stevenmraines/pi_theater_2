<template>
    <div class="form-group">
        <label for="season">* Season</label>
        <input
            type="number"
            id="season"
            class="form-control"
            min="1"
            :value="value"
            @change="seasonChange"
            @input="seasonChange"
        />
    </div>
</template>

<script>
    export default {
        props: [
            'eventDispatcher',
            'value',
        ],

        methods: {
            seasonChange(event) {
                this.eventDispatcher.$emit('seasonChange', event.target.value);
            },
        },
    }
</script>