/**
 * External dependencies
 */
import React from 'react'
import { editor, element, i18n, blockEditor } from 'wp'
const { RichText } = editor
/**
 * Internal dependencies
 */
import './style.scss'

const { __ } = i18n

const { InnerBlocks } = editor

export const name = 'media-text'

export const settings = {
  title: __('Media & RichText'),

  description: __('Custom media and rich text component'),

  icon: 'excerpt-view',

  edit({ className, attributes, setAttributes }) {
    const
        allowedBlocks = [
            'core/paragraph',
            'core/heading',
            'core/column',
            'core/image',
            'core/group'
        ],
        template = [
            [ 'core/image', {}, [] ],
            [ 'core/group', {}, [
                [ 'core/heading', {}, [] ],
                [ 'core/paragraph', {}, [] ]
            ] ],

        ];

    return (
        <section
            className={'wp-block--coliquio media-rich-text'}
        >
            <InnerBlocks
                allowedBlocks={ allowedBlocks }
                template={ template }
            />
        </section>
    );
  },

  save() {
    return (
        <section
            className={'wp-block--coliquio media-rich-text'}
        >
            <InnerBlocks.Content />
        </section>
    );
  },
}
