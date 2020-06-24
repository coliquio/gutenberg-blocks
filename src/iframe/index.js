import React from 'react'
import {blockEditor, components, i18n} from 'wp'

import './style.scss'

const { __ } = i18n
const { TextControl, PanelBody, SelectControl } = components
const { InspectorControls } = blockEditor

export const name = 'iframe'

const heightOptions = {
  SMALL: 300,
  MEDIUM: 475,
  LARGE: 650,
  DYNAMIC: 0,
}
const typeOptions = {
  IFRAME: 'iframe',
  IFRAME_VIDEO: 'iframe-video',
  IFRAME_SURVEY: 'iframe-survey',
}

export const settings = {
  title: __('iFrame'),

  description: __('Display external content'),

  icon: 'cover-image',

  attributes: {
    type: {
      type: 'string',
      default: typeOptions.IFRAME,
    },
    src: {
      type: 'string',
    },
    height: {
      type: 'number',
      default: heightOptions.SMALL,
    },
  },

  edit({ attributes, className, setAttributes }) {

    const {
      src,
      height,
      type,
    } = attributes;

    const heightOptionsUi = Object.keys(heightOptions).map(item => ({
      label: `${item} ${heightOptions[item] !== 0 ? `(${heightOptions[item]}px)` : ''}`,
      value: heightOptions[item]
    }))

    const typeOptionsUI = Object.keys(typeOptions).map(item => ({
      label: item,
      value: typeOptions[item],
    }))

    return (
        <>
          <InspectorControls>
            <PanelBody title={__('iframe settings')}>
              <SelectControl
                  label={__('Type of iframe (changes styling)')}
                  value={type}
                  options={typeOptionsUI}
                  onChange={type => setAttributes({ type })}
              />
              <TextControl
                  label={__('Source URL')}
                  value={src}
                  onChange={src => {
                    console.log(src)
                    setAttributes({ src, })
                  }}
              />
              <SelectControl
                  label={__('Visual Height')}
                  value={height}
                  options={heightOptionsUi}
                  onChange={height => setAttributes({ height })}
              />
            </PanelBody>
          </InspectorControls>
          <iframe frameborder={0} className={`${className} ${type}`} src={src} height={height}/>
        </>
    )
  },

  save({ attributes: { src, height, type } }) {
    return <iframe className={type} frameborder={0} src={`${src}`} height={height} allowfullscreen/>
  },
}
