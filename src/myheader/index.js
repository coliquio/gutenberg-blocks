import React from 'react';

// Wordpress Gutenberg
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';

import './style.scss';
export const name = 'myheader';

export const settings = {
  title: __('My Header'),

  // optional
  description: __('Test Header'),
  icon: 'art',
  keywords: [__('artheader'), __('artist')],
  styles: [
    {
      name: 'default',
      label: __('Default'),
      isDefault: true,
    },
    {
      name: 'dashed',
      label: __('Dashed'),
    },
    {
      name: 'rounded',
      label: __('Rounded'),
    },
  ],
  attributes: {
    content: {
      type: 'string',
    },
  },
  example: {
    attributes: {
      content: 'Mindful',
    },
  },
  variations: [
    {
      isDefault: true,
      name: 'artist',
      title: __('Artist'),
      description: __('Code is poetry!'),
      icon: 'button',
      attributes: { content: 'Art' },
    },
    {
      name: 'photographer',
      title: __('Photographer'),
      description: __('Code is a frame!'),
      icon: 'camera',
      attributes: { content: 'Photography', className: 'is-style-rounded' },
      keywords: [__('photographer')],
    },
  ],

  edit ({ attributes, className, setAttributes }) {
    const blockProps = useBlockProps();
    console.log('blockProps', blockProps);

    const updateFieldValue = val => {
      setAttributes({ content: val });
    };
    return (
      <div {...blockProps} className={[className].join(' ')}>
        <TextControl
          label="My Test Block"
          value={attributes.content}
          onChange={updateFieldValue}
        />
      </div>
    );
  },

  save ({ attributes }) {
    const blockProps = useBlockProps.save();

    return <div {...blockProps}> {attributes.content} </div>;
  },
};
