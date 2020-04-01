<template>
    <div class="fluid-modal scrollbar" ref="container">
    <!-- <div class="fluid-modal scrollbar" ref="container" v-on:click.stop="hide"> -->
        <div class="fluid-modal-content">
            <div class="fluid-modal-header mb-2">
                <span class="fluid-modal-title">
                    Watchlist
                </span>
                <button
                    class="fluid-modal-close close"
                    v-on:click="hide"
                >
                    <span>&times;</span>
                </button>
            </div>

            <hr class="fluid-modal-hr" />

            <div class="fluid-modal-poster-container">
                <div
                    class="fluid-modal-inner-poster-container mx-0"
                    v-if="user && user.watchlist.length > 0"
                >
                    <poster-container
                        class="my-3"
                        v-if="user"
                        v-for="media in user.watchlist"
                        v-bind:event-dispatcher="{}"
                        v-bind:id="media.id"
                        v-bind:key="media.id"
                        v-bind:media_type="media.media_type"
                        v-bind:poster="paths.posters + '/' + media.poster"
                        v-bind:title="media.title"
                    ></poster-container>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['user', 'paths'],

        created() {
            Event.listen('showWatchlistModal', this.show);
            Event.listen('hideModal', this.hide);
        },

        methods: {
            show() {
                document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
                $(this.$refs.container).fadeIn();
            },

            hide() {
                $(this.$refs.container).fadeOut();
                document.getElementsByTagName('body')[0].classList.remove('overflow-hidden');
            },
        },
    }
</script>
