/**
 * External dependencies
 */
import React from 'react'
import { editor, element, i18n, blockEditor } from 'wp'
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

  attributes: {
    
  },

  edit({ className }) {
    const
        allowedBlocks = [
            'core/paragraph',
            'core/heading',
            'core/columns',
            'core/column',
            'core/image'
        ],
        template = [
            [ 'core/columns', {}, [
                [ 'core/column', {}, [
                    [ 'coliquio/image' ],
                ] ],
                [ 'core/column', {}, [
                    [ 'core/paragraph', { placeholder: __('Enter side content...') } ],
                ] ],
            ] ]
        ];

    return (
        <section
            className={
                `${ className } 
                    wp-block--coliquio 
                    u-relative-hidden
                    is-back-end`
            }
        >
            <InnerBlocks
                allowedBlocks={ allowedBlocks }
                template={ template }
            />
        </section>
    );
  },

  save({ className }) {
    return (
        <section
            className={
                `${className}
                 wp-block--coliquio
                 u-relative-hidden 
                 is-front-end`
            }
        >
            <InnerBlocks.Content />
        </section>
    );
  },
}
