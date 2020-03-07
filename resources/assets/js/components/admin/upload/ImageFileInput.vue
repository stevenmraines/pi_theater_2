<template>
    <div class="form-group">
        <label for="file-upload">
            <span v-if="required">* </span>
            {{ label }}
            <a
                v-if="search"
                :href="'https://www.google.com/search?q=' + title + '+poster&tbm=isch'"
                target="_blank"
            > (Google)</a>
            <a
                v-if="search"
                :href="'https://www.impawards.com/search.php?search_data=' + title"
                target="_blank"
            > (IMP Awards)</a>
        </label>

        <div
            id="file-upload"
            class="file-drop p-5"
            :class="{ drag : isDrag }"
            @dragenter.prevent.stop="isDrag = true"
            @dragover.prevent.stop="isDrag = true"
            @dragleave.prevent.stop="isDrag = false"
            @drop.prevent.stop="fileChange"
            @click="triggerFileClick"
        >
            <button
                type="button"
                class="btn btn-primary"
            >
                Upload
            </button>
        </div>

        <span>
            {{ message }}
        </span>

        <input
            type="file"
            accept="image/*"
            @change="fileChange"
            ref="fileInput"
        />
    </div>
</template>

<script>
    // TODO fix bug where escaping from file selection without picking anything still sets a FileList to value
    // TODO Separate into MovieImageFileInput and ShowImageFileInput to add 'movie' or 'show' to search queries?
    export default {
        props: [
            'event',
            'eventDispatcher',
            'label',
            'required',
            'search',
            'title',
            'value',
        ],

        data() {
            return {
                isDrag: false,
            };
        },

        computed: {
            message() {
                if(!this.value || this.value.length === 0) {
                    return 'Select a File';
                }

                if(this.value.length === 1) {
                    return ('Selected File: ' + this.value.item(0).name);
                }
            },
        },

        methods: {
            fileChange(event) {
                this.isDrag = false;
                var dataTransfer = event.dataTransfer || event.target;
                this.eventDispatcher.$emit(this.event, dataTransfer.files);
            },

            triggerFileClick() {
                this.$refs.fileInput.click();
            },
        },
    }
</script>

<style scoped>
    input[type="file"] {
        display: none;
    }

    .file-drop {
        outline-style: dashed;
        background-color: rgba(200,220,255,0.7);
        text-align: center;
        cursor: pointer;
    }

    .drag {
        outline-color: blue;
        background-color: rgba(170,190,235,0.7);
    }
</style>