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
    },
    displayCopyright: {
      type: 'boolean',
      default: true,
    },
    displayCaption: {
      type: 'boolean',
      default: true,
    },
  },

  edit({ attributes, className, setAttributes, isSelected }) {
    const onSelectImage = image => {
      setAttributes({
        // @see Drupal image styles: /admin/config/media/image-styles
        src: image.media_details.sizes.crop_full_2x_ ? image.media_details.sizes.crop_full_2x_.source_url : image.url,
        originalSource: image.url,
        alt: image && image.alt,
        caption: image && image.caption,
      })
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
                    <img src={src} alt={alt} />
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
                allowedTypes={['image', 'remote_image']}
                value={{ id }}
                onError={alert}
            />
          </figure>

          <BlockControls>
            <Toolbar>
              <MediaUpload
                  allowedTypes={['image', 'remote_image']}
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
    const {
      copyright,
      displayCaption,
      displayCopyright,
    } = attributes;
    return (
        <figure className={className}>
          <img src={attributes.src} alt={attributes.alt}/>
          { displayCaption && <RichText.Content tagName="figcaption" value={attributes.caption}/> }
          { displayCopyright && copyright && <span className="copyright">{copyright}</span> }
        </figure>
    )
  },
}
