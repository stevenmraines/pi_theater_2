<template>
    <div class="form-group">
        <label :for="id">File</label>
        <select
            :id="id"
            class="form-control"
            :value="value"
            @change="eventDispatcher.$emit('videoFileChange', $event.target.value)"
        >
            <option
                v-for="file in files"
                :key="file.filename"
                :value="file.filename"
            >
                {{ file.filename }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    props: [
        'eventDispatcher',
        'files',
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