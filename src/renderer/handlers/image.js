/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import ViewElement from '@ckeditor/ckeditor5-engine/src/view/element';

export default function parseImage( node ) {
	const image = new ViewElement( 'img', { src: node.destination } );
	const figure = new ViewElement( 'figure', { class: 'image' }, image );

	return figure;
}
