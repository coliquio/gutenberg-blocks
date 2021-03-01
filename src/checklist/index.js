import React from 'react';
import { blockEditor, i18n } from 'wp';
import './style.scss';

const { __ } = i18n;

const { RichText } = blockEditor;

export const name = 'checklist';

export const settings = {
  title: __('Checklist'),

  description: __('List with green check marks'),

  icon: 'list-view',

  keywords: [
    __('checklist'),
    __('check marks'),
  ],

  attributes: {
    text: {
      type: 'string',
    },
  },


  edit ({ attributes, className, setAttributes }) {
    return (
      <RichText
        tagName="ul"
        formattingControls={['bold', 'link']}
        className={className}
        value={attributes.text}
        placeholder={__('Write your checklist here...')}
        onChange={text => setAttributes({ text })}
        multiline="li"
      />
    );
  },

  save ({ attributes, className }) {
    return (
      <RichText.Content
        tagName="ul"
        value={attributes.text}
        className={className}
      />
    );
  },
};
