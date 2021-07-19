<!--
 * ToolBar.vue
 * Created on Wed Jul 07 2021
 *
 * Copyright (c) git-story. Licensed under the MIT License.
-->
<template>
	<div
	 	@mouseover="$emit('mouseover', $event)"
	 	@mouseleave="$emit('mouseleave', $event)"
	 	@mousedown="onMouseDown"
		class="mde-toolbar-wrapper"
  		:class="dark && 'mde-dark'"
		:style="{ left: offsetX + 'px', top: offsetY + 'px' }">
		<div class="mde-toolbar">
			<icon-btn :dark="dark" :icon="assets.formatBold" @click="$emit('bold')"/>
			<icon-btn :dark="dark" :icon="assets.formatItalic" @click="$emit('italic')"/>
			<icon-btn :dark="dark" :icon="assets.formatStrike" @click="$emit('strike')"/>
			<divider vertical/>
			<icon-btn :dark="dark" :icon="assets.image" @click="$emit('image')"/>
			<icon-btn :dark="dark" :icon="assets.attachFile" @click="$emit('attach-file')"/>
		</div>
	</div>
</template>
<script>
import IconBtn from './IconBtn.vue';
import Divider from './Divider.vue';
import * as assets from '@/assets/icons/';

export default {
	name: 'ToolBar',
	components: {
		IconBtn,
		Divider,
	},
	data() {
		return {
			assets,
		};
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
		onMouseDown(evt) {
			evt.preventDefault();
		},
	},
}
</script>
<style scoped>
@import url("../assets/toolbar.css");
.mde-toolbar-wrapper {
	background-color: var(--mde-light-bg-color);
	display: table;
	padding: 7px 10px;
	position: absolute;
	z-index: 10;
	transition: opacity 0.5s;
}

.mde-toolbar-wrapper.mde-dark {
	background-color: var(--mde-dark-bg-color);
}

.mde-toolbar:before {
	content: "";
	width: 0px;
	height: 0px;
	position: absolute;
	border-left: 20px solid transparent;
	border-right: 20px solid transparent;
	border-top: 20px solid var(--mde-light-bg-color);
	border-bottom: 20px solid transparent;
	left: calc(50% - 20px);
	bottom: -40px;
}

.mde-dark .mde-toolbar:before {
	border-top: 20px solid var(--mde-dark-bg-color);
}

.mde-toolbar {
	position: relative;
	display: flex;
}
</style>
