<template>
    <div class="row" v-if="drive > 0 && files.length > 0">
        <div class="col">
            <form novalidate>
                <file-input
                    v-bind:files="files"
                ></file-input>

                <title-input></title-input>

                <year-released-input></year-released-input>

                <summary-input></summary-input>

                <notes-input></notes-input>

                <poster-input></poster-input>

                <jumbotron-input></jumbotron-input>

                <genres-input
                    v-bind:allGenres="genres"
                ></genres-input>

                <collections-input
                    v-bind:allCollections="collections"
                ></collections-input>

                <div class="form-group d-flex justify-content-around mt-3 mb-0">
                    <button class="btn btn-success" v-if="true">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'collections',
            'drive',
            'files',
            'genres',
        ],
    }
</script>

<style scoped>

</style>