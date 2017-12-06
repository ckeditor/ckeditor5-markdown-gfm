/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module markdown-gfm/commonmarkdataprocessor
 */

import commonMark from 'commonmark';
import Renderer from './renderer/renderer';
import ViewRange from '@ckeditor/ckeditor5-engine/src/view/range';
import TreeWalker from '@ckeditor/ckeditor5-engine/src/view/treewalker';

/**
 * This data processor implementation uses CommonMark as input/output data.
 *
 * @implements module:engine/dataprocessor/dataprocessor~DataProcessor
 */
export default class CommonMarkDataProcessor {
	/**
	 * Converts the provided CommonMark string to view tree.
	 *
	 * @param {String} data A CommonMark string.
	 * @returns {module:engine/view/documentfragment~DocumentFragment} The converted view element.
	 */
	toView( data ) {
		const parser = new commonMark.Parser();
		const ast = parser.parse( data );
		const renderer = new Renderer();

		return renderer.render( ast );
	}

	/**
	 * Converts the provided {@link module:engine/view/documentfragment~DocumentFragment} to data format &mdash; in this
	 * case to a CommonMark string.
	 *
	 * @param {module:engine/view/documentfragment~DocumentFragment} viewFragment
	 * @returns {String} CommonMark string.
	 */
	toData( documentFragment ) {
		let output = '';
		const walker = new TreeWalker( { boundaries: ViewRange.createIn( documentFragment ) } );

		for ( const entry of walker ) {
			const node = entry.item;
			const type = entry.type;

			// console.log( node, type );

			if ( type === 'elementStart' ) {
				// Check if inside figcaption.
				if ( node.is( 'element', 'img' ) ) {
					const src = node.getAttribute( 'src' );
					const alt = node.getAttribute( 'alt' ) || '';

					output += `![${ alt }](${ src })\n\n`;
				}

				if ( node.is( 'element', 'strong' ) ) {
					output += '**';
				}

				if ( node.is( 'element', 'i' ) ) {
					output += '*';
				}
			}

			if ( type === 'elementEnd' ) {
				if ( node.is( 'element', 'p' ) ) {
					output += '\n\n';
				}

				if ( node.is( 'element', 'strong' ) ) {
					output += '**';
				}

				if ( node.is( 'element', 'i' ) ) {
					output += '*';
				}
			}

			if ( type === 'text' ) {
				output += node.data;
			}
		}

		return output.trim();
	}
}

