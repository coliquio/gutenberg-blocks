import React from 'react';
import assign from 'lodash.assign';
import { blockEditor, components, compose, element, hooks, i18n } from 'wp';
import './style.scss';

const { createHigherOrderComponent } = compose;
const { Fragment } = element;
const { addFilter } = hooks;
const { __ } = i18n;
const { InspectorControls } = blockEditor;
const { PanelBody, RadioControl, ToggleControl } = components;

// Enable properties on the following blocks
const enableOnBlocks = [
  'core/file',
];

/**
 * Add extra attributes to block.
 *
 * @param {object} settings Current block settings.
 * @param {string} name Name of block.
 *
 * @returns {object} Modified block settings.
 */
const addExtraAttributes = (settings, name) => {
  // Do nothing if it's another block than our defined ones.
  if (!enableOnBlocks.includes(name)) {
    return settings;
  }

  settings.attributes = assign(settings.attributes, {
    textLinkTarget: {
      type: "string",
      default: "",
    }
  });

  return settings;
};

addFilter(
  "blocks.registerBlockType",
  "extend-block-file/attribute/extra-attributes",
  addExtraAttributes
);

/**
 * Add margin style attribute to save element of block.
 *
 * @param {object} saveElementProps Props of save element.
 * @param {Object} blockType Block type information.
 * @param {Object} attributes Attributes of block.
 *
 * @returns {object} Modified props of save element.
 */
const addExtraPropsStyle = ( saveElementProps, blockType, attributes ) => {
  if ( ! enableOnBlocks.includes( blockType.name ) ) {
      return saveElementProps;
  }
  wp.blocks.registerBlockStyle( 'core/file', {
    name: 'link',
    label: 'Link',
  });
  wp.blocks.registerBlockStyle( 'core/file', {
    name: 'button',
    label: 'Button'
  });
  saveElementProps.textLinkTarget = attributes.textLinkTarget;

  return saveElementProps;
};

addFilter( 'blocks.getSaveContent.extraProps', 'extend-block-image/get-save-content/extra-props-styles', addExtraPropsStyle );

