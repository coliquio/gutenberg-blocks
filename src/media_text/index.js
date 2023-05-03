import React from 'react';
import { editor, i18n } from 'wp';

import './style.scss';

const { __ } = i18n;

const { InnerBlocks } = editor;

export const name = 'media-text';

export const settings = {
  title: __('Media & RichText'),

  description: __('Custom media and rich text component'),

  icon: 'excerpt-view',

  edit () {
    const allowedBlocks = [
        'core/paragraph',
        'core/heading',
        'core/column',
        'core/image',
        'core/group',
      ],
      template = [
        ['core/image', {}, []],
        ['core/paragraph', {}, []],
      ];

    return (
      <section className={'wp-block--coliquio media-rich-text'}>
        <InnerBlocks allowedBlocks={allowedBlocks} template={template} />
      </section>
    );
  },

  save () {
    return (
      <section className={'wp-block--coliquio media-rich-text'}>
        <InnerBlocks.Content />
      </section>
    );
  },
};
