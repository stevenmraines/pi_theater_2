<template>
    <!-- TODO roll this and PosterInput into one component with the 2 radio buttons to control it? Leave Google and IMP search on both inputs? -->
    <div class="form-group">
        <label for="url">* Poster Image</label>

        <!-- Preview button -->
        <a
            href="javascript:void(0);"
            data-toggle="modal"
            data-target="#preview-modal"
            v-if="validUrl"
        >
            (Preview)
        </a>

        <!-- Input -->
        <input
            id="url"
            class="form-control"
            placeholder="https://www.example.com/images/picture.jpg"
            :value="value"
            @change="urlChange"
            @input="urlChange"
        />

        <!-- Image preview window -->
        <div class="modal" id="preview-modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Preview</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <img style="width:100%; height:auto;" :src="value" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'eventDispatcher',
        'value'
    ],

    computed: {
        validUrl() {
            return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(this.value);
        }
    },

    methods: {
        urlChange(event) {
            this.eventDispatcher.$emit('posterUrlChange', event.target.value);
        }
    }
}
</script>