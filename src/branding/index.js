import React from 'react';
import { blockEditor, i18n } from 'wp';
import './style.scss';

const { __ } = i18n;
const { InnerBlocks } = blockEditor;

export const name = 'branding-box';

const TEMPLATE = [
  [
    'core/paragraph',
    {
      content: 'Dieser Beitrag wird Ihnen präsentiert von',
    },
  ],
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

  edit ({ className }) {
    return (
      <div className={className}>
        <InnerBlocks template={TEMPLATE} templateLock="all" />
      </div>
    );
  },

  save ({ className }) {
    return (
      <div className={className}>
        <div className="branding-box-outer-wrapper">
          <aside className="branding-box-inner-wrapper">
            <InnerBlocks.Content />
          </aside>
        </div>
      </div>
    );
  },
};
