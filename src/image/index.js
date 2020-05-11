/**
 * External dependencies
 */
import React from 'react'
import { components, editor, element, i18n } from 'wp'
/**
 * Internal dependencies
 */
import './style.scss'


const { Fragment } = element
const { __ } = i18n

const { Toolbar, IconButton } = components
const { BlockControls, RichText, MediaUpload } = editor

export const name = 'image'

export const settings = {
  title: __('Image'),

  description: __('A custom block for Gutenberg Cloud'),

  icon: 'cover-image',

  attributes: {
    src: {
      type: 'string',
    },
    alt: {
      type: 'string',
    },
    caption: {
      type: 'string',
    },
  },

  edit({ attributes, className, setAttributes }) {
    const onSelectImage = (media) => {
      setAttributes({ src: media.url, alt: media && media.alt })
    }

    return (
      <Fragment>
        <figure className={className}>
          {attributes.src && <img src={attributes.src} alt={attributes.alt}/>}
          <RichText
            tagName="figcaption" value={attributes.caption} placeholder={__('Image caption')}
            onChange={value => setAttributes({ caption: value })} formattingControls={[]}
          />
        </figure>

        <BlockControls>
          <Toolbar>
            <MediaUpload
              allowedTypes={['image']}
              onSelect={(...args) => onSelectImage(...args)} render={({ open }) => (
              <IconButton className="components-toolbar__control" label={__('Edit image')} icon="edit" onClick={open}/>
            )}
            />
          </Toolbar>
        </BlockControls>
      </Fragment>
    )
  },

  save({ attributes, className }) {
    return (
      <figure className={className}>
        <img src={attributes.src} alt={attributes.alt}/>
        <RichText.Content tagName="figcaption" value={attributes.caption}/>
      </figure>
    )
  },
}
