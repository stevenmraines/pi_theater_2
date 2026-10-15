<template>
    <div class="form-group">
        <label :for="id">File</label>
        <select
            :id="id"
            class="form-control"
            :value="value"
            @change="change($event.target.value)"
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
    },

    methods: {
        change(newValue) {
            this.eventDispatcher.$emit('videoFileChange', newValue);
        },
    },

    watch: {
        /*
         * Trigger videoFileChange event on form submit so that the form automatically
         * updates all the other fields with the IMDb info of the next file name.
         */
        value(newValue, oldValue) {
            this.change(newValue);
        },
    },
}
</script>