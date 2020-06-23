import React from 'react'
import {blockEditor, components, i18n} from 'wp'
import './style.scss'


const { __ } = i18n
const { TextControl, PanelBody, SelectControl } = components
const { InnerBlocks } = blockEditor

export const name = 'branding-box'

/**
 * Visual variants for this highlight box
 */
const TEMPLATE = [
  ['coliquio/image', { placeholder: 'Recipe Title123', onChange123: (title) => setAttributes({ title }) }],
]

export const settings = {
  title: __('BrandingBox'),

  description: __('Visual wrapper with different styles'),

  icon: 'cover-image',

  attributes: {
    title: {
      type: 'string',
    },
  },

  edit({ attributes, className, setAttributes }) {

    const {
      title,
    } = attributes;

    return (
      <div className={ className }>
        <TextControl
          label={__('Box Title')}
          value={title || ''}
          onChange={title => setAttributes({ title })}
        />
        <InnerBlocks
          template={ TEMPLATE }
           />
      </div>
    )
  },

  save({ attributes }) {
    return (
      <InnerBlocks.Content />
    )
  },
}
