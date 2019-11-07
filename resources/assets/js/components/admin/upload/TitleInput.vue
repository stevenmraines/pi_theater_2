<template>
    <div class="form-group">
        <label for="title">* Title</label>
        <input
            class="form-control"
            :value="title"
            @change="eventDispatcher.$emit('titleChange', $event.target.value)"
        />
    </div>
</template>

<script>
    export default {
        props: [
            'eventDispatcher',
            'title',
        ],
    }
</script>