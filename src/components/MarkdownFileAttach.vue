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
		<div onmousedown="event.preventDefault(); false;" style="display: flex; margin-left: auto; margin-right: auto; max-width: 450px; width: 80%;">
			<a :href="source" :download="name" style="text-decoration: none; font-weight: unset; width: 100%; border: 1px solid #d4d4d4;">
				<div style="display: flex; background-color: white; padding: .8rem 1rem; align-items: center; cursor: pointer;">
					<img :src="cloud" style="width: 25px; height: 25px; margin-right: .8rem;">
					<span style="color: #585858; margin-right: auto;">{{ name }}</span>
					<img :src="fileDownlaod" style="width: 25px; height: 25px;">
				</div>
			</a>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MarkdownFileAttach',
	props: {
		onError: Function,
		onLoad: Function,
		name: String,
		source: String,
	},
	data() {
		return {
			cloud: `data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6m0-2C9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96C18.67 6.59 15.64 4 12 4z'/%3E%3C/svg%3E`,
			fileDownlaod: `data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' height='24px' viewBox='0 0 24 24' width='24px' fill='%23000000'%3E%3Cg%3E%3Crect fill='none' height='24' width='24'/%3E%3C/g%3E%3Cg%3E%3Cpath d='M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M17,11l-1.41-1.41L13,12.17V4h-2v8.17L8.41,9.59L7,11l5,5 L17,11z'/%3E%3C/g%3E%3C/svg%3E`,
		};
	},
}
</script>
