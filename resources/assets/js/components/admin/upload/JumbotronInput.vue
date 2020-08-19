<template>
    <div class="form-group">
        <label :for="id">
            Jumbotron Image
        </label>
        <div :id="id">
            <image-file-input
                :eventDispatcher="localEventDispatcher"
                :value="file"
            ></image-file-input>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'eventDispatcher',
            'file'
        ],

        data() {
            return {
                id: null,
                localEventDispatcher: new Vue({})
            }
        },

        created() {
            this.localEventDispatcher.$on('imageFileChange', (event) => this.eventDispatcher.$emit('jumbotronChange', event));
        },

        mounted() {
            this.id = this._uid;
        }
    }
</script>