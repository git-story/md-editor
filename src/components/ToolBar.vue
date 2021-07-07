<!--
 * ToolBar.vue
 * Created on Wed Jul 07 2021
 *
 * Copyright (c) git-story. Licensed under the MIT License.
-->
<template>
	<div
		class="mde-toolbar-wrapper"
  		:class="dark && 'mde-dark'"
		:style="{ left: offsetX, top: offsetY }">
		<div class="mde-toolbar">
			<icon-btn :dark="dark" icon="format-bold" @click="boldClick"/>
			<icon-btn :dark="dark" icon="format-italic" @click="italicClick"/>
			<icon-btn :dark="dark" icon="format-underlined" @click="underlinedClick"/>
			<divider vertical/>
			<icon-btn :dark="dark" icon="image" @click="imageClick"/>
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
		dark: {
			type: Boolean,
			default: false,
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
	background-color: #000000;
	display: table;
	padding: 7px 10px;
	position: absolute;
}

.mde-toolbar-wrapper.mde-dark {
	background-color: #ffffff;
}

.mde-toolbar:before {
	content: "";
	width: 0px;
	height: 0px;
	position: absolute;
	border-left: 20px solid transparent;
	border-right: 20px solid transparent;
	border-top: 20px solid #000000;
	border-bottom: 20px solid transparent;
	left: calc(50% - 20px);
	bottom: -40px;
}

.mde-dark .mde-toolbar:before {
	border-top: 20px solid #ffffff;
}

.mde-toolbar {
	position: relative;
	display: flex;
}
</style>
