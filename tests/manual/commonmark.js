/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals console, window, document */

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import CommonMark from '../../src/commonmark';

ClassicEditor
	.create( document.querySelector( '#editor' ), {
		plugins: [ CommonMark ],
		toolbar: [ 'headings', 'undo', 'redo', 'bold', 'italic', 'link' ],
		image: {
			toolbar: [ 'imageTextAlternative' ]
		},
		heading: {
			options: [
				{ modelElement: 'paragraph', title: 'Paragraph' },
				{ modelElement: 'heading1', viewElement: 'h1', title: 'Heading 1' },
				{ modelElement: 'heading2', viewElement: 'h2', title: 'Heading 2' },
				{ modelElement: 'heading3', viewElement: 'h3', title: 'Heading 3' },
				{ modelElement: 'heading4', viewElement: 'h4', title: 'Heading 4' },
				{ modelElement: 'heading5', viewElement: 'h5', title: 'Heading 5' },
				{ modelElement: 'heading6', viewElement: 'h6', title: 'Heading 6' },
			]
		}
	} )
	.then( editor => {
		window.editor = editor;

		const markdown =
			'# Hello world!\n' +
			'\n' +
			'This is **loaded** from *markdown*.\n' +
			'\n' +
			'![image](https://upload.wikimedia.org/wikipedia/en/f/fc/CKEditor_logo.png)\n' +
			'\n' +
			'this is [link](http://ckeditor.com)';

		const outputContainer = document.getElementById( 'output' );
		editor.document.on( 'changesDone', () => {
			outputContainer.innerText = editor.getData();
		} );

		editor.setData( markdown );
	} )
	.catch( err => {
		console.error( err.stack );
	} );
