import React from 'react'
import {blockEditor, components, i18n} from 'wp'

import './style.scss'

const { __ } = i18n
const { Toolbar, IconButton, TextControl, PanelBody } = components
const { RichText, BlockControls, MediaUpload, MediaPlaceholder, InspectorControls } = blockEditor

export const name = 'image'

export const settings = {
  title: __('coliquio Image'),

  description: __('Single image'),

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
    copyright: {
      type: 'string',
    }
  },

  edit({ attributes, className, setAttributes, isSelected }) {
    const onSelectImage = (media) => {
      setAttributes({ src: media.url, alt: media && media.alt, caption: media && media.caption })
    }
    const {
      src = '',
      alt,
      caption,
      copyright,
      id,
    } = attributes;

    return (
        <>
          <InspectorControls>
            <PanelBody title={__('Image settings')}>
              <TextControl
                  label={__('Alt Tag')}
                  value={alt}
                  onChange={alt => setAttributes({ alt })}
              />
              <TextControl
                  label={__('Copyright')}
                  value={copyright}
                  onChange={copyright => setAttributes({ copyright })}
              />
            </PanelBody>
          </InspectorControls>

          <figure className={className}>
            {
              src && (
                  <>
                    <img src={src} alt={alt} width="300"/>
                    <RichText
                        tagName="figcaption" value={caption} placeholder={__('Put image caption here...')}
                        onChange={caption => setAttributes({ caption })}
                    />
                    { copyright && <span className="copyright">{copyright}</span> }
                  </>
              )
            }

            <MediaPlaceholder
                className={className}
                disableMediaButtons={src && !isSelected}
                icon={!src && 'dashicons-images-alt'}
                labels={{
                  title: !src && __('Image'),
                  instructions: src ? __('Replace image') : __('Please select image'),
                }}
                onSelect={onSelectImage}
                accept="image/*"
                allowedTypes={['image', 'remote image']}
                value={{ id }}
                onError={alert}
            />
          </figure>

          <BlockControls>
            <Toolbar>
              <MediaUpload
                  allowedTypes={['image', 'remote image']}
                  onSelect={(...args) => onSelectImage(...args)} render={({ open }) => (
                  <IconButton className="components-toolbar__control" label={__('Edit image')} icon="edit"
                              onClick={open}/>
              )}
              />
            </Toolbar>
          </BlockControls>
        </>
    )
  },

  save({ attributes, className }) {
    return (
        <figure className={className}>
          <img src={attributes.src} alt={attributes.alt}/>
          <RichText.Content tagName="figcaption" value={attributes.caption}/>
          { attributes.copyright && <span className="copyright">{attributes.copyright}</span> }
        </figure>
    )
  },
}
