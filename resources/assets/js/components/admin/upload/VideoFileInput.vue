<template>
    <div class="form-group">
        <label for="file">File</label>
        <select
            id="file"
            class="form-control"
            :value="value"
            @change="eventDispatcher.$emit('videoFileChange', $event.target.value)"
        >
            <option
                v-for="f in files"
                :key="f"
                :value="f"
            >
                {{ f }}
            </option>
        </select>
    </div>
</template>

<script>
    // TODO figure out how to do bootstrap labels without ID
    export default {
        props: [
            'eventDispatcher',
            'files',
            'value',
        ],
    }
</script>