import React from 'react'
import {blockEditor, components, i18n} from 'wp'

import './style.scss'

const { __ } = i18n
const { TextControl, PanelBody, SelectControl } = components
const { InspectorControls, InnerBlocks } = blockEditor

export const name = 'highlight'

/**
 * Visual variants for this highlight box
 */
const styleType = {
  GREY_BOX: 'grey-box',
  BLUE_BORDER: 'blue-border',
}

export const settings = {
  title: __('Highlight'),

  description: __('Visual wrapper with different styles'),

  icon: 'cover-image',

  attributes: {
    title: {
      type: 'string',
    },
    style: {
      type: 'string',
      default: styleType.BLUE_BORDER,
    },
  },

  edit({ attributes, className, setAttributes }) {

    const {
      title,
      style,
    } = attributes;

    return (
        <>
          <InspectorControls>
            <PanelBody title={__('Highlight settings')}>
              <TextControl
                  label={__('Box Title')}
                  value={title || ''}
                  onChange={title => setAttributes({ title })}
              />
              <SelectControl
                  label={__('Visual Appearance')}
                  value={style}
                  options={[
                    { label: __('Thick Blue Border'), value: styleType.BLUE_BORDER },
                    { label: __('Soft Grey Box'), value: styleType.GREY_BOX },
                  ]}
                  onChange={style => setAttributes({ style })}
              />
            </PanelBody>
          </InspectorControls>
          <section className={`${className} ${style}`}>
            {title && <div className="title">{title}</div>}
            <div className="content">
              <InnerBlocks/>
            </div>
          </section>
        </>
    )
  },

  save({ attributes }) {
    return (
        <section className={attributes.style}>
          {attributes.title && <div className="title">{attributes.title}</div>}
          <div className="content">
            <InnerBlocks.Content/>
          </div>
        </section>
    )
  },
}
