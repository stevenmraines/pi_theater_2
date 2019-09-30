<template>
    <div
        class="fluid-modal scrollbar"
        id="search-modal-container"
        ref="container"
    >
        <div id="search-modal-controls">
            <button
                class="fluid-modal-close close d-block"
                v-on:click="hide"
            >
                <span>&times;</span>
            </button>
            <input
                id="search-input"
                ref="input"
                placeholder="Search for Movies and TV Shows..."
                spellcheck="false"
                v-model:value="query"
            />
        </div>

        <div id="search-modal-content" class="fluid-modal-content">
            <div>
                <div class="fluid-modal-inner-poster-container mx-0" v-if="query !== ''">
                    <ais-index
                        app-id="JUG06PFXKY"
                        api-key="713be18b5c43b5766349f0a144622559"
                        index-name="media"
                        v-bind:query="query"
                    >
                        <ais-results ref="results">
                            <template slot-scope="{ result }">
                                <poster-container
                                    v-bind:key="result.objectID"
                                    v-bind:id="result.id"
                                    v-bind:title="result.title"
                                    v-bind:poster="paths.posters + '/' + result.poster"
                                    v-bind:event-dispatcher="{}"
                                ></poster-container>
                            </template>
                        </ais-results>
                    </ais-index>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['contents', 'paths'],

        data() {
            return {
                query: '',
            };
        },

        created() {
            Event.listen('hideModal', this.hide);
            Event.listen('hideSearchModal', this.hide);
            Event.listen('showSearchModal', this.show);
        },

        methods: {
            show() {
                var self = this;
                document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
                $(this.$refs.container).fadeIn();

                setTimeout(function() {
                    self.$refs.input.focus();
                }, 400);
            },

            hide() {
                var self = this;
                $(this.$refs.container).fadeOut();

                setTimeout(function() {
                    self.query = '';
                    document.getElementsByTagName('body')[0].classList.remove('overflow-hidden');
                }, 400);
            },
        },
    }
</script>

<style scoped>
    .ais-results {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-around;
    }
</style>
