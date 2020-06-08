import React from 'react'
import {components, editor, element, i18n} from 'wp'
import './style.scss'

const { Fragment } = element
const { __ } = i18n

const { PanelBody, TextControl, ToggleControl } = components
const { RichText, InspectorControls } = editor

export const name = 'cta'

export const settings = {
  title: __('Call To Action Button'),

  description: __('A CTA button that links to some content'),

  icon: 'button',

  attributes: {
    text: {
      type: 'string',
    },
    url: {
      type: 'string',
    },
    targetNewWindow: {
      type: 'boolean',
    }
  },

  edit({ attributes, className, setAttributes }) {

    return (
        <Fragment>

          <InspectorControls>
            <PanelBody title={ __( 'CTA settings' ) }>
              <TextControl
                  label={ __( 'Link to Content' ) }
                  value={ attributes.url || '/my-path'}
                  onChange={ (val) => setAttributes({ url: val }) }
              />
            <ToggleControl
                label={__('Open hyperlink in new tab?')}
                onChange={() => setAttributes({ targetNewWindow: !attributes.targetNewWindow })}
                checked={attributes.targetNewWindow}
            />
            </PanelBody>
          </InspectorControls>

          <RichText
              className={className}
              tagName="a"
              value={attributes.text}
              placeholder={__('Button Text')}
              target={attributes.targetNewWindow ? '_blank' : '_self'}
              onChange={value => setAttributes({ text: value })}
              formattingControls={[]}
          />

        </Fragment>
    )
  },

  save({ attributes, className }) {
    return (
        <RichText.Content
            tagName="a"
            className={className}
            href={attributes.url}
            value={attributes.text}
            target={attributes.targetNewWindow ? '_blank' : '_self'}
            rel="noreferrer noopener"
        />
    )
  },
}
