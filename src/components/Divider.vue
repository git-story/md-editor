<!--
 * Divider.vue
 * Created on Wed Jul 07 2021
 *
 * Copyright (c) git-story. Licensed under the MIT License.
-->
<template>
	<hr :class="vertical && 'mde-divider-vertical'" :vertical="vertical" class="mde-divider" >
</template>
<script>
export default {
	name: 'Divider',
	props: {
		vertical: {
			type: Boolean,
			default: false,
		},
	},
}
</script>
<style scoped>
.mde-divider {
	display: block;
	flex: 1 1 0px;
	max-width: 100%;
	max-height: 0;
	height: 0;
	border: solid;
	border-width: thin 0 0;
	transition: inherit;
	border-color: #afafaf;
	color: #ebebeb;
}

.mde-divider-vertical {
	align-self: stretch;
	border: solid;
	border-width: 0 thin 0 0;
	display: inline-flex;
	min-height: 100%;
	max-height: 100%;
	max-width: 0;
	width: 0;
	vertical-align: text-bottom;
	margin: 0;
	border-color: #ebebeb;
	height: 35px;
}
</style>
