/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import ViewElement from '@ckeditor/ckeditor5-engine/src/view/element';

export default function parseImage( node, event, walker ) {
	const image = new ViewElement( 'img', { src: node.destination } );
	const figure = new ViewElement( 'figure', { class: 'image' }, image );

	const child = node.firstChild;

	// Parse text inside image and put it into alt.
	if ( child && child.type == 'text' ) {
		image.setAttribute( 'alt', child.literal );

		walker.resumeAt( child, false );
	}

	return figure;
}
