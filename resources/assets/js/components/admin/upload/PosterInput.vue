<template>
    <div class="form-group">
        <label :for="id">
            * Poster Image
            <a
                :href="'https://www.google.com/search?q=' + title + '+poster&tbm=isch'"
                target="_blank"
            > (Google)</a>
            <a
                :href="'https://www.impawards.com/search.php?search_data=' + title"
                target="_blank"
            > (IMP Awards)</a>
        </label>
        <div :id="id">
            <multi-image-input
                :eventDispatcher="localEventDispatcher"
                :file="file"
                :url="url"
            ></multi-image-input>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'eventDispatcher',
            'file',
            'title',
            'url',
        ],

        data() {
            return {
                id: null,
                localEventDispatcher: new Vue({})
            }
        },

        created() {
            this.localEventDispatcher.$on('imageFileChange', (event) => this.eventDispatcher.$emit('posterChange', event));
            this.localEventDispatcher.$on('imageUrlChange', (event) => this.eventDispatcher.$emit('posterUrlChange', event));
        },

        mounted () {
            this.id = this._uid
        },
    }
</script>