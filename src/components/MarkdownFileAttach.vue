<!--
 * MarkdownFileAttach.vue
 * Created on Thu Jul 08 2021
 *
 * Copyright (c) git-story. Licensed under the MIT License.
 *
 * This file is only write style attribute
 * You must not use class attribute.
-->
<template>
	<div style="display: block;">
		asdfasdf
	</div>
</template>

<script>
export default {
	name: 'MarkdownFileAttach',
	props: {
		onError: Function,
		onLoad: Function,
		source: String,
	},
	mounted() {
	},
}
</script>

<style scoped>
.container {
	display: block;
}
</style>
