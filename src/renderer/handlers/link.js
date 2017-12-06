/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import ViewElement from '@ckeditor/ckeditor5-engine/src/view/element';
import ViewText from '@ckeditor/ckeditor5-engine/src/view/text';

export default function parseLink( node, event, walker ) {
	const link = new ViewElement( 'a', { href: node.destination } );
	const child = node.firstChild;
	const text = new ViewText( '' );

	// Parse text inside image and put it into alt.
	if ( child && child.type == 'text' ) {
		text.data = child.literal;

		walker.resumeAt( child, false );
	}

	link.appendChildren( text );
	return link;
}
