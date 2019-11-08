<template>
    <div class="form-group">
        <label for="title">* Title</label>
        <input
            id="title"
            class="form-control"
            :value="value"
            @change="titleChange"
            @input="titleChange"
        />
    </div>
</template>

<script>
    // TODO add optional search for episode title
    export default {
        props: [
            'eventDispatcher',
            'value',
        ],

        methods: {
            titleChange(event) {
                this.eventDispatcher.$emit('titleChange', event.target.value);
            },
        },
    }
</script>