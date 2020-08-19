<template>
    <div class="form-group">
        <div class="input-group">
            <!-- Preview button -->
            <button
                class="btn btn-primary input-group-prepend"
                data-toggle="modal"
                :data-target="'#' + id"
                :disabled="!imageLoaded"
                type="button"
            >
                Preview
            </button>

            <!-- Input -->
            <input
                class="form-control"
                placeholder="https://www.example.com/images/picture.jpg"
                :value="value"
                @change="urlChange"
                @input="urlChange"
            />
        </div>

        <!-- Image preview window -->
        <div class="modal" :id="id" tabindex="-1" role="dialog">
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

    data() {
        return {
            id: null,
            image: null,
            imageLoaded: false
        };
    },

    mounted () {
        this.id = this._uid
        /*
            Reapply src here so that the preview button is correctly enabled or
            disabled when switching between image URL or file for poster input.
        */
        this.image.src = this.value;
    },

    created() {
        this.image = new Image();
        this.image.onload = this.onload;
        this.image.onerror = this.onerror;
    },

    watch: {
        /*
            Watch for changes in value prop so that imageLoaded will
            be updated when value is set in MovieForm or ShowForm.
        */
        value(newValue) {
            this.image.src = newValue;
        }
    },

    methods: {
        onerror() {
            this.imageLoaded = false;
        },

        onload() {
            this.imageLoaded = true;
        },

        urlChange(event) {
            this.image.src = event.target.value;
            this.eventDispatcher.$emit('imageUrlChange', event.target.value);
        }
    }
}
</script>