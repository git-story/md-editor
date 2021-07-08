<!--
 * IconBtn.vue
 * Created on Wed Jul 07 2021
 *
 * Copyright (c) git-story. Licensed under the MIT License.
-->
<template>
	<div class="mde-icon-btn-wrapper" @click="$emit('click', $event)">
		<div
	  		class="mde-icon-btn"
			:style="{ 'background-image': `url(${iconSvg})`, ...iconSize }" />
	</div>
</template>
<script>
export default {
	name: 'IconBtn',
	props: {
		icon: String,
		size: {
			type: String,
			default: 'md',
		},
		dark: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		iconSvg() {
			return require(`@/assets/icons/${this.icon}${this.dark ? '-dark' : ''}.svg`);
		},
		iconSize() {
			switch( this.size ) {
				case 'md':
					return { width: '35px', height: '35px' };
			}
		},
	},
}
</script>
<style scoped>
@import url("../assets/toolbar.css");
.mde-icon-btn-wrapper {
	cursor: pointer;
	background-color: var(--mde-light-bg-color);
	transition: background 0.8s;
}

.mde-dark .mde-icon-btn-wrapper {
	background-color: var(--mde-dark-bg-color);
}

.mde-icon-btn-wrapper:hover {
	background: var(--mde-light-hover-color) radial-gradient(circle, transparent 1%, var(--mde-light-hover-color) 1%) center/15000%;
}

.mde-dark .mde-icon-btn-wrapper:hover {
	background: var(--mde-dark-hover-color) radial-gradient(circle, transparent 1%, var(--mde-dark-hover-color) 1%) center/15000%;
}

.mde-icon-btn-wrapper:active {
	background-color: var(--mde-light-active-color);
	transition: background 0s;
}

.mde-dark .mde-icon-btn-wrapper:active {
	background-color: var(--mde-dark-active-color);
	transition: background 0s;
}

.mde-icon-btn {
	background-repeat: no-repeat;
    background-position: center;
}
</style>
