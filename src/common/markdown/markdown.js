import { parseCodeblocks } from './parsers'
import { extractImages, stripCodeblocks } from './utils'
import marked from 'marked';
import hljs from 'highlight.js';

const mappingLanguage = (language) => {
	switch ( language ) {
		case 'js': return 'javascript';
		case 'ts': return 'typescript';
	}
	return language;
}


marked.setOptions({
	langPrefix: 'hljs language-',
	highlight: (code, language) => {
		try {
			language = mappingLanguage(language);
			return hljs.highlight(language, code).value;
		} catch {
			return code;
		}
	},
});

class Markdown {
	constructor(text) {
		this.text = text || ''
	}

	get html() {
		return marked(this.text);
	}

	codeblocks() {
		return parseCodeblocks(this.text)
	}

	images() {
		return extractImages(this.text)
	}

	stripCodeblocks() {
		return stripCodeblocks(this.text)
	}

	replaceLine(line, text) {
		const stext = this.text.split('\n');

		if ( line < 0 || line >= stext.length ) {
			console.error('Overflow line number ', line);
			return false;
		}

		stext[line] = text;

		this.text = stext.join('\n');
		return this.text;
	}
}

export default Markdown
