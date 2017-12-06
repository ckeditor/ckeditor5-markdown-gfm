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
		toolbar: [ 'undo', 'redo', 'bold', 'italic' ],
		image: {
			toolbar: [ 'imageTextAlternative' ]
		}
	} )
	.then( editor => {
		window.editor = editor;

		const markdown =
			'Hello world!\n' +
			'\n' +
			'This is **loaded** from *markdown*.\n' +
			'\n' +
			'![image](https://upload.wikimedia.org/wikipedia/en/f/fc/CKEditor_logo.png)';

		editor.setData( markdown );
	} )
	.catch( err => {
		console.error( err.stack );
	} );
