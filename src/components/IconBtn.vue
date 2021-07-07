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
	},
	computed: {
		iconSvg() {
			return require(`@/assets/icons/${this.icon}.svg`);
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
.mde-icon-btn-wrapper {
	cursor: pointer;
	background-color: ##ffffff;
	transition: background 0.8s;
}

.mde-icon-btn-wrapper:hover {
	background: #ebebeb radial-gradient(circle, transparent 1%, #ebebeb 1%) center/15000%;
}

.mde-icon-btn-wrapper:active {
	background-color: #afafaf;
	transition: background 0s;
}

.mde-icon-btn {
	background-repeat: no-repeat;
    background-position: center;
}
</style>
