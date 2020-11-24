import React from 'react'
import assign from 'lodash.assign';

const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;

// Enable properties on the following blocks
const enableOnBlocks = [
  'core/gallery',
];

/**
 * Add src attribute to block.
 *
 * @param {object} settings Current block settings.
 * @param {string} name Name of block.
 *
 * @returns {object} Modified block settings.
 */
const addSrcControlAttribute = ( settings, name ) => {

  // Do nothing if it's another block than our defined ones.
  if ( ! enableOnBlocks.includes( name ) ) {
    return settings;
  }

  // Use Lodash's assign to gracefully handle if attributes are undefined
  settings.attributes = assign( settings.attributes, {
    caption: {
      type: 'string',
      default: '',
    },
    images: {
      type: 'array',
      default: [],
    },
  } );

  return settings;
};

addFilter( 'blocks.registerBlockType', 'extend-block-group/attribute/column-layout', addSrcControlAttribute );

/**
 * Create HOC to add src attribute to block.
 */
const withSrcAttribute = createHigherOrderComponent( ( BlockEdit ) => {
  return ( props ) => {
    // Do nothing if it's another block than our defined ones.
    if ( ! enableOnBlocks.includes( props.name ) ) {
      return (
        <BlockEdit { ...props } />
      );
    }

    // trnsform image caption to satisfy validation rules
    if (props.attributes.images && props.attributes.images.length) {
        let changed = false; // it looks weird but additional check is needed not to create endless loop in react
        const temp = props.attributes.images.map((image, i) => {
            if (typeof image.caption === 'object') {
                changed = true;
                image.caption = image.caption.raw ? image.caption.raw : undefined
            }
            return image;
        });
        if (changed) {
            props.setAttributes({
                images: temp
            });
        }
    }

    return (
      <Fragment>
        <BlockEdit { ...props } />
      </Fragment>
    );
  };
}, 'withSrcAttribute' );

addFilter( 'editor.BlockEdit', 'extend-block-group/with-column-layout', withSrcAttribute );
