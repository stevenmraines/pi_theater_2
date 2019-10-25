<template>
    <div>
        <div class="form-group">
            <label for="title">Title</label>
            <input
                id="title"
                class="form-control"
                name="title"
                v-model="title"
                v-bind:placeholder="placeholder"
                required
            />
        </div>
        <div class="text-danger mb-3" v-if="false">
            The title is required
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'eventDispatcher',
            'file',
        ],

        data() {
            return {
                title: '',
            };
        },

        computed: {
            placeholder() {
                var filename = this.file.substr(0, this.file.length - 4);

                var tokens = filename.split('-');

                var exceptions = ['a', 'an', 'for', 'in', 'of', 'on', 'the'];

                for(var i = 0; i < tokens.length; i++) {
                    if(exceptions.indexOf(tokens[i].toLowerCase()) === -1) {
                        tokens[i] = tokens[i].substr(0, 1).toUpperCase() + tokens[i].substr(1);
                    }
                }

                return tokens.join(' ');
            },
        },

        created() {

        },

        methods: {

        },
    }
</script>

<style scoped>

</style>