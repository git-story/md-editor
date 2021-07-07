<!--
 * ToolBar.vue
 * Created on Wed Jul 07 2021
 *
 * Copyright (c) git-story. Licensed under the MIT License.
-->
<template>
	<div class="mde-toolbar-wrapper" :style="{ left: offsetX, top: offsetY }">
		<div class="mde-toolbar">
			<icon-btn icon="format-bold" @click="boldClick"/>
			<icon-btn icon="format-italic" @click="italicClick"/>
			<icon-btn icon="format-underlined" @click="underlinedClick"/>
			<divider vertical/>
			<icon-btn icon="image" @click="imageClick"/>
		</div>
	</div>
</template>
<script>
import IconBtn from './IconBtn.vue';
import Divider from './Divider.vue';

export default {
	name: 'ToolBar',
	components: {
		IconBtn,
		Divider,
	},
	props: {
		offsetX: {
			type: Number,
			default: 0,
		},
		offsetY: {
			type: Number,
			default: 0,
		},
	},
	methods: {
		boldClick(evt) {
			console.log('bold', evt);
		},
		italicClick(evt) {
			console.log('italic', evt);
		},
		underlinedClick(evt) {
			console.log('underlined', evt);
		},
		imageClick(evt) {
			console.log('image', evt);
		},
	},
}
</script>
<style scoped>
.mde-toolbar-wrapper {
	background-color: #ffffff;
	display: table;
	padding: 7px 10px;
	border-radius: 5px;
	position: absolute;
}

.mde-toolbar:before {
	content: "";
	width: 0px;
	height: 0px;
	position: absolute;
	border-left: 20px solid transparent;
	border-right: 20px solid transparent;
	border-top: 20px solid #ffffff;
	border-bottom: 20px solid transparent;
	left: calc(50% - 20px);
	bottom: -40px;
}

.mde-toolbar {
	position: relative;
	display: flex;
}
</style>
