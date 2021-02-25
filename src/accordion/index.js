/**
 * External dependencies
 */
import React from 'react';
import { editor, element, i18n } from 'wp';
/**
 * Internal dependencies
 */
import './style.scss';

const { Fragment } = element;
const { __ } = i18n;

const { RichText, InnerBlocks } = editor;

export const name = 'accordion';

const ALLOWED_BLOCKS = ['coliquio/accordion-item'];

export const settings = {
  title: __('Accordion'),

  description: __('A custom Accordion block for Gutenberg Cloud'),

  icon: 'excerpt-view',

  attributes: {
    accordionTitle: {
      type: 'string',
    },
  },

  edit ({ attributes, setAttributes }) {
    return (
      <Fragment>
        <div className="accordion-component">
          <RichText
            tagName="p"
            placeholder={__('Accordion Title(optional)')}
            value={attributes.accordionTitle}
            className="accordion-component-header"
            onChange={value => setAttributes({ accordionTitle: value })}
          />
          <div>
            <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
          </div>
        </div>
      </Fragment>
    );
  },

  save ({ attributes }) {
    let titleBlock = '';
    if (attributes.accordionTitle) {
      titleBlock = (
        <summary className="accordion-header">
          <RichText.Content value={attributes.accordionTitle} />
        </summary>
      );
    }
    return (
      <div>
        {titleBlock}
        <div>
          <InnerBlocks.Content />
        </div>
      </div>
    );
  },
};
