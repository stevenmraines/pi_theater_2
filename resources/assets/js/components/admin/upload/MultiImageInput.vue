<template>
    <div>
        <div class="d-flex justify-content-center mb-3">
            <button class="btn" :class="urlClasses" type="button" @click="inputType = 'url'">Image URL</button>
            <button class="btn" :class="fileClasses" type="button" @click="inputType = 'file'">Image File</button>
        </div>
        <image-file-input
            v-if="inputType == 'file'"
            :eventDispatcher="eventDispatcher"
            :value="file"
        ></image-file-input>
        <image-url-input
            v-if="inputType == 'url'"
            :eventDispatcher="eventDispatcher"
            :value="url"
        ></image-url-input>
    </div>
</template>

<script>
export default {
    props: [
        'eventDispatcher',
        'file',
        'url'
    ],

    computed: {
        fileClasses() {
            return {
                'btn-primary': this.inputType === 'file',
                'btn-outline-primary': this.inputType !== 'file'
            };
        },

        urlClasses() {
            return {
                'btn-primary': this.inputType === 'url',
                'btn-outline-primary': this.inputType !== 'url'
            };
        }
    },

    data() {
        return {
            inputType: 'url'
        };
    }
}
</script>