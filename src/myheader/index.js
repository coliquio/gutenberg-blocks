import React from 'react';
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

import { useBlockProps } from '@wordpress/block-editor';

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
      icon: 'art',
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
    console.log('attributes', attributes);
    console.log('classname', className);

    // const blockProps = useBlockProps();

    const updateFieldValue = val => {
      setAttributes({ content: val });
    };
    return (
      <div className={[className].join(' ')}>
        <TextControl
          label="My Test Block"
          value={attributes.content}
          onChange={updateFieldValue}
        />
      </div>
    );
  },

  save ({ attributes }) {
    return <div> {attributes.content} </div>;
  },
};
