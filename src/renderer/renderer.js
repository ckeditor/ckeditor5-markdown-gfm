/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import ViewDocumentFragment from '@ckeditor/ckeditor5-engine/src/view/documentfragment';
import ViewElement from '@ckeditor/ckeditor5-engine/src/view/element';
import ViewText from '@ckeditor/ckeditor5-engine/src/view/text';

export default class Renderer {
	render( ast ) {
		const viewDocumentFragment = new ViewDocumentFragment();
		const walker = ast.walker();
		let event;
		let currentParent = viewDocumentFragment;

		while ( ( event = walker.next() ) ) {
			const node = event.node;
			const type = node.type;
			const entering = event.entering;

			if ( type == 'paragraph' ) {
				if ( entering ) {
					const paragraph = new ViewElement( 'p' );

					currentParent.appendChildren( paragraph );
					currentParent = paragraph;
				} else {
					currentParent = currentParent.parent;
				}
			}

			if ( type == 'text' ) {
				if ( entering ) {
					currentParent.appendChildren( new ViewText( node.literal ) );
				}
			}
		}

		return viewDocumentFragment;
	}
}
