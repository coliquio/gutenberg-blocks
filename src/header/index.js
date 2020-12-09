import React from 'react'
import {blockEditor, components, element, i18n} from 'wp'
import './style.scss'

const { Fragment } = element
const { __ } = i18n

const { PanelBody, TextControl, ToggleControl, RadioControl } = components
const {RichText, InspectorControls} = blockEditor

export const name = 'header'

export const settings = {
  title: __('Header'),

  description: __('Header with Kicker and Headline'),

  icon: 'button',

  attributes: {
    kicker: {
      type: 'string',
    },
    headline: {
      type: 'string',
    },
  },

  edit({ attributes, className, setAttributes }) {
    return (
        <Fragment>

          <div className={className}>
            <RichText
                className='kicker'
                tagName="p"
                formattingControls={['superscript', 'subscript']}
                value={attributes.kicker}
                placeholder={__('Kicker line...')}
                onChange={value => setAttributes({ kicker: value })}
            />
            <RichText
                className='headline'
                tagName="p"
                formattingControls={['superscript', 'subscript']}
                value={attributes.headline}
                placeholder={__('Headline...')}
                onChange={value => setAttributes({ headline: value })}
            />
          </div>

        </Fragment>
    )
  },

  save({ attributes, className }) {
    return (
      <h1 className={className}>
        <RichText.Content
            tagName="span"
            className='kicker'
            value={attributes.kicker}
        />
        <RichText.Content
            tagName="span"
            className='headline'
            value={attributes.headline}
        />
      </h1>
    )
  },
}
