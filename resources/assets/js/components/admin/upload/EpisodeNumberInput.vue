<template>
    <div class="form-group">
        <label for="episode-number">* Episode</label>
        <input
            type="number"
            id="episode-number"
            class="form-control"
            min="1"
            :value="value"
            @change="episodeNumberChange"
            @input="episodeNumberChange"
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
            episodeNumberChange(event) {
                this.eventDispatcher.$emit('episodeNumberChange', event.target.value);
            },
        },
    }
</script>