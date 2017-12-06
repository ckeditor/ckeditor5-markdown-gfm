/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import ViewText from '@ckeditor/ckeditor5-engine/src/view/text';

export default function parseText( node ) {
	return new ViewText( node.literal );
}
