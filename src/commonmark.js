/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import Clipboard from '@ckeditor/ckeditor5-clipboard/src/clipboard';
import Enter from '@ckeditor/ckeditor5-enter/src/enter';
import Typing from '@ckeditor/ckeditor5-typing/src/typing';
import Undo from '@ckeditor/ckeditor5-undo/src/undo';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageTextAlternative from '@ckeditor/ckeditor5-image/src/imagetextalternative';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import Link from '@ckeditor/ckeditor5-link/src/link';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';

import CommonMarkDataProcessor from './commonmarkdataprocessor';

// Simple plugin which loads the data processor.
function EnableDataProcessor( editor ) {
	editor.data.processor = new CommonMarkDataProcessor();
}

export default class CommonMark extends Plugin {
	static get requires() {
		return [
			Clipboard,
			Enter,
			Typing,
			Undo,
			Paragraph,
			Bold,
			Italic,
			Image,
			ImageTextAlternative,
			ImageToolbar,
			Link,
			Heading,
			Autoformat,
			EnableDataProcessor
		];
	}
}
