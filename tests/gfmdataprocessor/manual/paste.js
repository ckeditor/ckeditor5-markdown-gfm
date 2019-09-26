/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* global console, window */

import global from '@ckeditor/ckeditor5-utils/src/dom/global';

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import Enter from '@ckeditor/ckeditor5-enter/src/enter';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Typing from '@ckeditor/ckeditor5-typing/src/typing';
import Undo from '@ckeditor/ckeditor5-undo/src/undo';
import Clipboard from '@ckeditor/ckeditor5-clipboard/src/clipboard';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import Blockquote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import ShiftEnter from '@ckeditor/ckeditor5-enter/src/shiftenter';

import marked from './../../../src/lib/marked/marked';
import GFMRenderer from './../../../src/lib/marked/renderer';
import HtmlDataProcessor from '@ckeditor/ckeditor5-engine/src/dataprocessor/htmldataprocessor';

const PasteMarkdownDecorator = function( editor ) {
	const dataProcessor = new HtmlDataProcessor();

	editor.plugins.get( 'Clipboard' ).on(
		'inputTransformation',
		( evt, data ) => {
			// @todo: Typically before processing you'd want to do some basic validation whether
			// conversion is actually neede.

			const text = data.dataTransfer.getData( 'text/plain' );
			const html = marked.parse( text, {
				gfm: true,
				breaks: true,
				tables: true,
				xhtml: true,
				renderer: new GFMRenderer()
			} );

			data.content = dataProcessor.toView( html );
		}, {
			priority: 'high'
		}
	);
};

ClassicEditor
	.create( global.document.querySelector( '#editor' ), {
		plugins: [
			Bold, Clipboard, Enter, Italic, Link, List, Paragraph, Typing,
			Underline, Undo, Image, ImageCaption, ImageToolbar, Code, Blockquote,
			List, Heading, ShiftEnter, PasteMarkdownDecorator
		],
		toolbar: [ 'italic', 'bold', 'link', 'underline', '|', 'undo', 'redo' ]
	} )
	.then( editor => {
		window.editor = editor;
	} )
	.catch( err => {
		console.error( err.stack );
	} );
