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

  attributes: {
    content: {
        type: 'string',
        default: '',
    },
  },

  edit({ className, attributes, setAttributes }) {
    const
        allowedBlocks = [
            'core/paragraph',
            'core/heading',
            'core/columns',
            'core/column',
            'core/image'
        ],
        template = [
            [ 'core/image', {}, [] ]
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
                templateLock="all"
            />
            <RichText
              tagName="p"
              placeholder={__('Content')}
              value={attributes.content}
              className=""
              onChange={(content) =>
                  setAttributes({ content })
              }
            />
        </section>
    );
  },

  save({ className, attributes: { content } }) {
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
        <div className="media-text-content">
            <RichText.Content
                  tagName="div"
                  className="media-text-content"
                  value={ content }
              />
        </div>
        </section>
    );
  },
}
