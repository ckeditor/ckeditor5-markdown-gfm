/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import ViewDocumentFragment from '@ckeditor/ckeditor5-engine/src/view/documentfragment';
import handlers from './handlers';

export default class Renderer {
	render( ast ) {
		const walker = ast.walker();
		let event;
		let currentParent = null;

		while ( ( event = walker.next() ) ) {
			const node = event.node;
			const type = node.type;
			const isEntering = event.entering;
			const handler = handlers[ type ];

			// Skip nodes which we do not handle.
			if ( !handler ) {
				if ( isEntering ) {
					walker.resumeAt( node, false );
				}

				continue;
			} else {
				if ( isEntering ) {
					const newNode = handler( node );

					if ( currentParent ) {
						currentParent.appendChildren( newNode );
					}

					if ( node.isContainer ) {
						currentParent = newNode;
					}
				} else {
					if ( currentParent.parent ) {
						currentParent = currentParent.parent;
					}
				}
			}
		}

		return currentParent || new ViewDocumentFragment();
	}
}
