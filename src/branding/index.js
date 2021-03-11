import React from 'react';
import { blockEditor, components, i18n } from 'wp';
import './style.scss';

const { __ } = i18n;
const { TextControl } = components;
const { InnerBlocks } = blockEditor;

export const name = 'branding-box';

const TEMPLATE = [
  [
    'core/image',
    {
      displayCopyright: false,
      displayCaption: false,
    },
  ],
];

export const settings = {
  title: __('Branding Box'),

  description: __('Visual wrapper with different styles'),

  icon: 'tickets-alt',

  attributes: {
    title: {
      type: 'string',
      default: 'Dieser Beitrag wird Ihnen präsentiert von',
    },
  },

  edit ({ attributes, className, setAttributes }) {
    const { title } = attributes;

    return (
      <div className={className}>
        <TextControl
          value={title || ''}
          // eslint-disable-next-line no-shadow
          onChange={title => setAttributes({ title })}
        />
        <InnerBlocks template={TEMPLATE} templateLock="all" />
      </div>
    );
  },

  save ({ attributes, className }) {
    const { title } = attributes;

    return (
      <div className={className}>
        <div className="branding-box-outer-wrapper">
          <aside className="branding-box-inner-wrapper">
            {title && <span className="branding-title">{title}</span>}
            <InnerBlocks.Content />
          </aside>
        </div>
      </div>
    );
  },
};
