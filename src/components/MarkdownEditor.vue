<template>
	<div>
		<codemirror
			class="editor"
			:class="{ dark: (theme === 'dark'), light: (theme === 'light') }"
			:options="options"
			:value="value"
			@input="onInput"
			@ready="onReady"
			@blur="hideToolbar"/>
		<tool-bar
	  		ref="tool"
	 		@mouseover="onToolbarMouseOver"
	 		@mouseleave="onToolbarMouseLeave"
			:dark="theme === 'dark'"
	 		:style="toolbar.show ? 'opacity: 100' : 'opacity: 0;'"
   			:offset-x="toolbar.x"
			:offset-y="toolbar.y"
			@bold="bold"
			@italic="italic"
			@underlined="underlined"
			@image="image"/>
	</div>
</template>

<script>
import deepmerge from 'deepmerge'
import Vue from 'vue'
import { codemirror } from 'vue-codemirror'

// import codemirror dependencies
import 'codemirror/addon/mode/overlay'
import 'codemirror/addon/mode/simple'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/gfm/gfm'
import 'codemirror/mode/markdown/markdown'
import '@/assets/one-mixed.css'

import { isVimLoaded, loadMode, loadVim } from '@/common/codemirror/codemirror'
import Markdown from '@/common/markdown/markdown'
import MarkdownEditorImage from '@/components/MarkdownEditorImage'
import ToolBar from '@/components/ToolBar.vue';

const GenerateImage = () => (Vue.extend(MarkdownEditorImage))

// https://stackoverflow.com/questions/1409355/finding-the-offset-client-position-of-an-element
function getElementTop ( elem )
{
    let yPos = elem.offsetTop;
    let tempEl = elem.offsetParent;

    while ( tempEl != null )
    {
        yPos += tempEl.offsetTop;
        tempEl = tempEl.offsetParent;
    }

    return yPos;
}


function getElementLeft ( elem )
{
    let xPos = elem.offsetLeft;
    let tempEl = elem.offsetParent;

    while ( tempEl != null )
    {
        xPos += tempEl.offsetLeft;
        tempEl = tempEl.offsetParent;
    }
    return xPos;
}


export default {
	name: 'MarkdownEditor',
	components: {
		codemirror,
		ToolBar,
	},
	props: {
		initialCursor: {
			type: Object,
			default: () => ({
				character: 0,
				line: 0,
			}),
			validator: (cursor) => (
				Object.prototype.hasOwnProperty.call(cursor, 'character') && Object.prototype.hasOwnProperty.call(cursor, 'line')
			),
		},
		initialVimMode: {
			type: String,
		},
		settings: {
			type: Object,
			default: () => ({
				// nothing yet
			}),
		},
		theme: {
			type: String,
			default: 'dark',
		},
		value: String,
	},
	data() {
		return {
			defaultConfig: {
				images: {
					enabled: false,
					showCaptions: false,
				},
				keyMap: 'default',
				mode: 'gfm',
				tabSize: 2,
			},
			editor: null,
			isInitialVimModeSet: false,
			isVimLoaded: false,
			text: '',
			widgets: [],
			imgIc: 0,
			toolbar: {
				show: false,
				x: 0,
				y: 0,
				timeoutVal: 0,
				timeout: 3000,
			},
		}
	},
	watch: {
		settings() {
			this.maybeLoadVim()
		},
	},
	computed: {
		codeblocks() {
			return this.markdown.codeblocks()
		},
		config() {
			return deepmerge(this.defaultConfig, this.settings)
		},
		images() {
			return this.markdown.images()
		},
		keyMap() {
			if (this.config.keyMap === 'vim' && !this.isVimLoaded) return 'default'

			return this.config.keyMap
		},
		markdown() {
			return new Markdown(this.text)
		},
		options() {
			return {
				addModeClass: true,
				extraKeys: {
					// use spaces instead of tabs
					// https://github.com/codemirror/CodeMirror/issues/988#issuecomment-14921785
					'Shift-Tab': (instance) => {
						instance.indentSelection('subtract')
					},
					Tab: (instance) => {
						if (instance.somethingSelected()) {
							instance.indentSelection('add')
						} else {
							instance.replaceSelection(Array(instance.getOption('tabSize') + 1).join(' '), 'end', '+input')
						}
					},
					'Ctrl-V': async (instance) => {
						const clipboardItems = await navigator.clipboard.read();

						for (const clipboardItem of clipboardItems) {
							for ( let i = 0; i < clipboardItem.types.length; i++ ) {
								const type = clipboardItem.types[i];
								const blob = await clipboardItem.getType(type);

								if (blob.type.startsWith('image')) {
									const blobUrl = URL.createObjectURL(blob);
									instance.replaceSelection(`![image${this.imgIc++}](${blobUrl})`);
									/* Test Code
									const b64 = await this.blobToBase64(blobUrl);
									console.log('base64', b64);
									console.log('url ori ', blobUrl, 'resolve', this.base64URLToBlobURL(b64));
									*/
								} else if ( blob.type === 'text/html' && clipboardItem.types[i+1].startsWith('image') ) {
									// do nothing
									// When you copy an image from the browser, the source is copied as well.
								} else {
									const text = await blob.text();
									instance.replaceSelection(text);
								}
							}
						}
					},
				},
				indentUnit: this.config.tabSize,
				indentWithTabs: false,
				keyMap: this.keyMap,
				lineWrapping: true,
				mode: {
					name: this.config.mode,
					// fencedCodeBlockDefaultMode: 'html',
					highlightFormatting: true,
				},
				singleCursorHeightPerLine: true,
				tabSize: this.config.tabSize,
				theme: 'one-mixed',
			}
		},
	},
	methods: {
		bold() {
			const selection = this.editor.getSelection();
			if ( selection ) {
				const from = this.editor.getCursor(true);
				const to = this.editor.getCursor(false);

				this.editor.replaceSelection(`**${selection}**`);
				from.ch += 2;
				to.ch += 2;
				this.editor.setSelection(from, to);
			} else {
				const cursor = this.editor.getCursor();
				this.editor.replaceSelection('**bold**');
				cursor.ch += 2; // b
				const endCursor = { ...cursor }; // copy
				endCursor.ch += 4; // d
				this.editor.setSelection(cursor, endCursor);
			}
		},
		italic() {
		},
		underlined() {
		},
		image() {
		},
		focus() {
			this.editor.focus()
		},
		focusEnd() {
			this.editor.setCursor({ line: this.editor.lineCount(), ch: 0 })
		},
		focusStart() {
			this.editor.setCursor({ line: 0, ch: 0 })
		},
		loadImages() {
			// clear all line widgets
			// TODO: only clear the ones that change
			this.widgets.forEach((widget) => this.editor.removeLineWidget(widget))

			if (this.config.images.enabled) {
				this.images.forEach((image) => {
					let lineWidget

					const ImageInstance = GenerateImage()

					const component = new ImageInstance({
						propsData: {
							alt: image.alt,
							onError: () => lineWidget.changed(),
							onLoad: () => lineWidget.changed(),
							showCaptions: this.config.images.showCaptions,
							source: image.url,
						},
					})

					lineWidget = this.editor.addLineWidget(image.line, component.$mount().$el, { above: true })

					this.widgets.push(lineWidget)
				})
			}
		},
		loadModes() {
			this.codeblocks.forEach((codeblock) => {
				if (codeblock.language) {
					// language specified
					loadMode(codeblock.language, {
						onload: this.refresh,
					})
				}
			})
		},
		maybeLoadVim() {
			if (this.settings.keyMap === 'vim' && !this.isVimLoaded) {
				loadVim({
					onload: () => { this.isVimLoaded = true },
				})
			}
		},
		maybeSetVimMode() {
			if (this.initialVimMode && !this.isInitialVimModeSet && this.keyMap === 'vim') {
				this.editor.setOption('keyMap', this.initialVimMode || this.keyMap)

				if (this.initialVimMode === 'vim-insert') {
					this.editor.state.vim.insertMode = true
					this.editor.setOption('disableInput', false)
					window.CodeMirror.signal(this.editor, 'vim-mode-change', { mode: 'insert' })
				}

				this.isInitialVimModeSet = true
			}
		},
		showToolbar() {
			let x = 0;
			let y = 0;
			const cursor = this.editor.display.cursorDiv.lastChild;
			const toolbarEl = this.$refs.tool.$el;
			if ( cursor ) {
				x = getElementLeft(cursor) - (toolbarEl.clientWidth / 2);
				y = getElementTop(cursor) - (toolbarEl.clientHeight + 20);
			} else {
				const cursor = window.getSelection().anchorNode;
				x = getElementLeft(cursor) - (toolbarEl.clientWidth / 2);
				y = getElementTop(cursor) - (toolbarEl.clientHeight + 20);
			}

			this.toolbar.x = +x;
			this.toolbar.y = +y;
			this.toolbar.show = true;
			if ( this.toolbar.timeout !== 0 ) {
				clearTimeout(this.toolbar.timeoutVal);
				this.toolbar.timeoutVal = 0;
			}

			this.toolbar.timeoutVal = setTimeout(() => {
				this.toolbar.show = false;
			}, this.toolbar.timeout);
		},
		onToolbarMouseOver() {
			if ( this.toolbar.show ) {
				clearTimeout(this.toolbar.timeoutVal);
			}
		},
		onToolbarMouseLeave() {
			if ( this.toolbar.show ) {
				this.toolbar.timeoutVal = setTimeout(() => {
					this.toolbar.show = false;
				}, this.toolbar.timeout);
			}
		},
		hideToolbar() {
			if ( this.toolbar.timeout !== 0 ) {
				clearTimeout(this.toolbar.timeoutVal);
				this.toolbar.timeoutVal = 0;
			}
			this.toolbar.show = false;
		},
		onClick() {
			this.$nextTick(() => {
				this.showToolbar();
			});
		},
		onInput(text) {
			this.text = text

			if (text !== this.value) {
				// prevent CM input events on :value changes
				this.$emit('input', text)
			}

			this.loadImages()
			this.loadModes()
		},
		onReady(instance) {
			this.editor = instance
			this.text = this.editor.getValue()

			this.maybeLoadVim()
			this.maybeSetVimMode()

			this.editor.setCursor({
				ch: this.initialCursor.character,
				line: this.initialCursor.line,
			})

			instance.getWrapperElement().addEventListener('mouseup', this.onClick.bind(this));
			instance.on('keydown', this.hideToolbar.bind(this));

			this.$emit('ready', instance)
			this.loadImages()
			this.loadModes()
		},
		refresh() {
			// get current cursor position
			const cursor = this.editor.getCursor()

			// refresh editor
			this.editor.setValue(this.editor.getValue())

			// set cursor position back to where it was
			this.editor.setCursor(cursor)
		},
		blobToBase64(url) {
			return new Promise(async (resolve, reject) => {
				const res = await fetch(url);
				const reader = new FileReader();
				reader.onloadend = () => {
					resolve(reader.result);
				}
				reader.readAsDataURL(await res.blob());
			});
		},
		base64ToBlob(b64Data, contentType='', sliceSize=512) {
			// https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
			const byteCharacters = atob(b64Data);
			const byteArrays = [];

			for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
				const slice = byteCharacters.slice(offset, offset + sliceSize);

				const byteNumbers = new Array(slice.length);
				for (let i = 0; i < slice.length; i++) {
					byteNumbers[i] = slice.charCodeAt(i);
				}

				const byteArray = new Uint8Array(byteNumbers);
				byteArrays.push(byteArray);
			}

			const blob = new Blob(byteArrays, {type: contentType});
			return blob;
		},
		parseB64URL(b64) {
			const data = b64.match(/^data:(.*)?;(?:base64,)?(.*)/);
			if ( data.length !== 3 ) {
				throw Error('This is not base64 url');
			}
			return {
				contentType: data[1],
				data: data[2],
			};
		},
		base64URLToBlobURL(b64URL, contentType='', sliceSize=512) {
			const data = this.parseB64URL(b64URL);
			const blob = this.base64ToBlob(data.data, data.contentType, sliceSize);
			return URL.createObjectURL(blob);
		},
		async buildMarkdown() {
			const md = this.markdown;
			const splMd = md.text.split('\n');
			for ( const img of this.images ) {
				if ( img.url.startsWith('blob:') ) {
					const b64img = await this.blobToBase64(img.url);
					const repl = splMd[img.line].replace(/!\[(.*?)\]\((.+?)\)/, `![$1](${b64img})`);
					md.replaceLine(img.line, repl);
				}
			}
			return md.text;
		},
	},
	created() {
		this.isVimLoaded = isVimLoaded()
	},
}
</script>

<style scoped>
.editor >>> .CodeMirror.cm-s-one-mixed {
	background-color: transparent !important;
}

.editor >>> .CodeMirror .cm-m-markdown:not(.cm-comment) {
	font-family: helvetica, sans-serif;
	font-size: 1em;
}

.editor >>> .CodeMirror {
	min-height: 100%;
	height: auto;
}

.editor >>> .CodeMirror {
	position: relative;
	font-size: 1em;
	line-height: 2.25em;
}

.editor >>> .CodeMirror .CodeMirror-line,
.editor >>> .CodeMirror .CodeMirror-line-like {
	font-family: 'Courier New', monospace;
	font-size: 1em;
	padding: 0;
}

.editor >>> .CodeMirror .cm-header-1 {
	font-size: 1.6em !important;
}

.editor >>> .CodeMirror .cm-header-2 {
	font-size: 1.5em !important;
}

.editor >>> .CodeMirror .cm-header-3 {
	font-size: 1.4em !important;
}

.editor >>> .CodeMirror .cm-header-4 {
	font-size: 1.3em !important;
}

.editor >>> .CodeMirror .cm-header-5 {
	font-size: 1.2em !important;
}

.editor >>> .CodeMirror .cm-header-6 {
	font-size: 1.1em !important;
}

.editor >>> .CodeMirror-scroll {
	overflow-y: hidden !important;
}

.light.editor >>> .caption {
	color: #444;
}
</style>
