<template>
    <div class="row" v-if="drive > 0 && files.length > 0">
        <div class="col">
            <form novalidate>
                <file-input
                    :files="files"
                ></file-input>

                <shows-input
                    :shows="shows"
                ></shows-input>

                <season-input></season-input>

                <episode-number-input></episode-number-input>

                <episode-title-input></episode-title-input>

                <summary-input></summary-input>

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
            'drive',
            'files',
            'shows',
        ],
    }
</script>

<style scoped>

</style>