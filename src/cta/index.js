import React from 'react';
import { blockEditor, components, element, i18n } from 'wp';
import './style.scss';

const { Fragment } = element;
const { __ } = i18n;

const { PanelBody, TextControl, ToggleControl, RadioControl } = components;
const { RichText, InspectorControls } = blockEditor;

export const name = 'cta';

function renderClassName (defaultClassName, attributes) {
  let className = defaultClassName;
  if (attributes.style !== 'button' && className) {
    className = `${className} ${className}--${attributes.style}`;
  }
  return className;
}

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
    },
    style: {
      type: 'string',
      default: 'button',
    },
  },

  edit ({ attributes, setAttributes, className }) {
    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__('CTA settings')}>
            <TextControl
              label={__('Link to Content')}
              value={attributes.url || '/my-path'}
              onChange={val => setAttributes({ url: val })}
            />
            <RadioControl
              label="Display Style"
              selected={attributes.style}
              options={[
                { label: 'Button', value: 'button' },
                { label: 'Link', value: 'link' },
              ]}
              onChange={option => setAttributes({ style: option })}
            />
            <ToggleControl
              label={__('Open hyperlink in new tab?')}
              onChange={() =>
                setAttributes({ targetNewWindow: !attributes.targetNewWindow })
              }
              checked={attributes.targetNewWindow}
            />
          </PanelBody>
        </InspectorControls>

        <RichText
          className={renderClassName(className, attributes)}
          tagName="a"
          value={attributes.text}
          placeholder={__('Button Text')}
          target={attributes.targetNewWindow ? '_blank' : '_self'}
          onChange={value => setAttributes({ text: value })}
        />
      </Fragment>
    );
  },

  save ({ attributes, className = 'wp-block-coliquio-cta' }) {
    return (
      <RichText.Content
        tagName="a"
        className={renderClassName(className, attributes)}
        href={attributes.url}
        value={attributes.text}
        target={attributes.targetNewWindow ? '_blank' : '_self'}
        rel="noreferrer noopener"
      />
    );
  },
};
