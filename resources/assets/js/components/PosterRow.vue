<template>
	<div>
		<h4 class="h4 pl-4">{{ title }}</h4>
		<div class="container-fluid poster-row px-0 py-3 mb-5">
			<span class="left-arrow">&#8249;</span>
			<span class="right-arrow">&#8250;</span>
			<div class="slider">
				<ais-index
					app-id="JUG06PFXKY"
					api-key="713be18b5c43b5766349f0a144622559"
					v-bind:index-name="index"
					v-bind:query-parameters="queryParams"
				>
					<div>
						<ais-stats />
						<ais-results>
							<template slot-scope="{ result }">
								<poster-container
									v-bind:key="result.objectID"
									v-bind:id="result.id"
									v-bind:title="result.title"
									v-bind:poster="result.poster"
								></poster-container>
							</template>
						</ais-results>
					</div>
				</ais-index>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['title', 'index', 'queryParams'],

		created() {

		}
	}
</script>
