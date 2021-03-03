import React from 'react';
import get from 'lodash.get';

// Wordpress Gutenberg
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { PanelBody } from '@wordpress/components';
import {
  useBlockProps,
  InspectorControls,
  RichText,
} from '@wordpress/block-editor';

import './style.scss';

export const name = 'header';

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

  edit ({ attributes, className, setAttributes }) {
    const length =
      get(attributes, 'kicker.length', 0) +
      get(attributes, 'headline.length', 0);
    const idealLength = 70;
    const veryBadLength = 90;
    const classNames = [className];
    const warnLevel =
      length > idealLength ? (length > veryBadLength ? 2 : 1) : 0;
    if (warnLevel > 0) {
      classNames.push('warning-too-long-' + warnLevel);
    }
    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__('Title Size')}>
            <p>
              {length} Characters
              {warnLevel > 0 ? (
                <div className={'header-invalid-too-long-' + warnLevel}>
                  Exceeding ideal size by {length - idealLength} Characters!
                </div>
              ) : (
                <div className={'header-valid'}>Perfect!</div>
              )}
            </p>
          </PanelBody>
        </InspectorControls>

        <div {...useBlockProps} className={classNames.join(' ')}>
          <RichText
            className="kicker"
            tagName="p"
            formattingControls={['superscript', 'subscript']}
            value={attributes.kicker}
            placeholder={__('Kicker line...')}
            onChange={value => setAttributes({ kicker: value })}
          />
          <RichText
            className="headline"
            tagName="p"
            formattingControls={['superscript', 'subscript']}
            value={attributes.headline}
            placeholder={__('Headline...')}
            onChange={value => setAttributes({ headline: value })}
          />
        </div>
      </Fragment>
    );
  },

  save ({ attributes, className }) {
    return (
      <h1 className={className}>
        <RichText.Content
          tagName="span"
          className="kicker"
          value={attributes.kicker}
        />
        <RichText.Content
          tagName="span"
          className="headline"
          value={attributes.headline}
        />
      </h1>
    );
  },
};
