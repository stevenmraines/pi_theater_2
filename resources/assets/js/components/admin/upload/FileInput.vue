<template>
    <div>
        <div class="form-group">
            <label for="video-file">
                <span v-if="required">* </span>
                {{ label }}
            </label>
            <div
                id="video-file"
                class="btn btn-primary"
            >
                Upload
            </div>
            <span v-if="value">Selected File: {{ value.name }}</span>
            <span v-else>Select File</span>
        </div>
        <input
            type="file"
            class="form-control-file"
            :required="required"
            @change="$emit('input', $event.target.files[0])"
        />
        <div class="text-danger mb-3" v-if="false">
            The poster image is required
        </div>
    </div>
</template>

<script>
    // TODO implement required warning message
    export default {
        props: [
            'label',
            'required',
            'value'
        ],
    }
</script>

<style scoped>
    input[type="file"] {
        display: none;
    }
</style>