/**
 * External dependencies
 */
import React from 'react'
import { editor, element, i18n, blockEditor } from 'wp'
/**
 * Internal dependencies
 */
import './style.scss'

// Theme
// import namespace from '../../namespace';


const { Fragment } = element
const { __ } = i18n

const { RichText, InnerBlocks } = editor
const { MediaUpload } = blockEditor

export const name = 'media-text'

const ALLOWED_BLOCKS = [ 'coliquio/image', 'core/paragraph' ];

export const settings = {
  title: __('Media&RichText'),

  description: __('Custom media and rich text component'),

  icon: 'excerpt-view',

  attributes: {
    
  },

  edit({ attributes, className, setAttributes }) {
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
