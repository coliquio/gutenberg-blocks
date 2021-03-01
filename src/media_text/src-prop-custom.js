import React from 'react';
import assign from 'lodash.assign';
import { compose, element, hooks } from 'wp';

const { createHigherOrderComponent } = compose;
const { Fragment } = element;
const { addFilter } = hooks;

// Enable spacing control on the following blocks
const enableSpacingControlOnBlocks = [
  'core/media-text',
];

/**
 * Add src attribute to block.
 *
 * @param {object} settings Current block settings.
 * @param {string} name Name of block.
 *
 * @returns {object} Modified block settings.
 */
const addSrcControlAttribute = (settings, name) => {
  // Do nothing if it's another block than our defined ones.
  if (! enableSpacingControlOnBlocks.includes(name)) {
    return settings;
  }
  // Use Lodash's assign to gracefully handle if attributes are undefined
  settings.attributes = assign(settings.attributes, {
    src: {
      type: 'string',
      default: '',
    },
    className: {
      type: 'string',
      default: '',
    },
  });

  return settings;
};

addFilter('blocks.registerBlockType', 'extend-block-media-text/attribute/src', addSrcControlAttribute);

/**
 * Create HOC to add src attribute to block.
 */
const withSrcAttribute = createHigherOrderComponent(BlockEdit => {
  return props => {
    // Do nothing if it's another block than our defined ones.
    if (! enableSpacingControlOnBlocks.includes(props.name)) {
      return (
        <BlockEdit { ...props } />
      );
    }

    props.setAttributes({
      className: 'alignwide',
    });
		
    const { mediaUrl } = props.attributes;
        

    if (props.attributes.mediaUrl) {
      props.setAttributes({
        src: mediaUrl,
      });
    }

    return (
      <Fragment>
        <BlockEdit { ...props } />
      </Fragment>
    );
  };
}, 'withSrcAttribute');

addFilter('editor.BlockEdit', 'extend-block-src/with-src-attribute', withSrcAttribute);
