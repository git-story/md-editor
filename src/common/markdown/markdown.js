import { parseCodeblocks } from './parsers'
import { extractImages, stripCodeblocks } from './utils'

class Markdown {
	constructor(text) {
		this.text = text || ''
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