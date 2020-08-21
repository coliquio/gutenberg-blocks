import React from 'react'
import {blockEditor, components, i18n} from 'wp'

import './style.scss'

const { __ } = i18n
const { Toolbar, IconButton, TextControl, PanelBody, SelectControl, Notice } = components
const { RichText, BlockControls, MediaUpload, MediaPlaceholder, InspectorControls } = blockEditor

export const name = 'image'

const alignOptions = {
  NONE: 'align-none',
  LEFT: 'align-left',
  RIGHT: 'align-right',
  CENTER: 'align-center',
}

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
    alignment: {
      type: 'string',
      default: alignOptions.NONE,
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
        src: (image.media_details && image.media_details.sizes && image.media_details.sizes.crop_full_2x_) ? image.media_details.sizes.crop_full_2x_.source_url : image.url,
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
      alignment,
      id,
    } = attributes;

    const alignOptionsUi = Object.keys(alignOptions).map(item => ({
      label: item,
      value: alignOptions[item]
    }))

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
              <SelectControl
                  label={__('Image Alignment')}
                  value={alignment}
                  options={alignOptionsUi}
                  onChange={alignment => setAttributes({ alignment })}
                  help={__('The text will float around if you select left or right.')}
              />
              {
                (alignment === 'left' || alignment === 'right') && (
                    <Notice status="info" isDismissible={false}>
                      To reselect this image block later on, it's easier to use the top left <strong>Block navigation</strong> if you use image alignment.
                    </Notice>
                )
              }
            </PanelBody>
          </InspectorControls>
          <figure className={`${className} ${alignOptions[alignment]}`}>
            {
              src && (
                  <>
                    <img src={src} alt={alt}/>
                    <RichText
                        tagName="figcaption" value={caption} placeholder={__('Put image caption here...')}
                        onChange={caption => setAttributes({ caption })}
                    />
                    {copyright && <span className="copyright">{copyright}</span>}
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

  save({ attributes }) {
    const {
      copyright,
      displayCaption,
      displayCopyright,
      alignment,
    } = attributes;
    return (
        <figure className={alignOptions[alignment]}>
          <img src={attributes.src} alt={attributes.alt}/>
          {displayCaption && <RichText.Content tagName="figcaption" value={attributes.caption}/>}
          {displayCopyright && copyright && <span className="copyright">{copyright}</span>}
        </figure>
    )
  },
}
