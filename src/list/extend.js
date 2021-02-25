import React from 'react';
import assign from 'lodash.assign';
import { blockEditor, components, compose, element, hooks, i18n } from 'wp';

import './style.scss';

const { createHigherOrderComponent } = compose;
const { Fragment } = element;
const { addFilter } = hooks;
const { __ } = i18n;
const { InspectorControls } = blockEditor;
const { PanelBody, ToggleControl } = components;


// Enable properties on the following blocks
const enableOnBlocks = [
  'core/list',
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
  if (! enableOnBlocks.includes(name)) {
    return settings;
  }

  // Use Lodash's assign to gracefully handle if attributes are undefined
  settings.attributes = assign(settings.attributes, {
    customEnumeration: {
      type: 'boolean',
      default: false,
    },
    className: {
      type: 'string',
      default: '',
    },
  });

  return settings;
};

addFilter('blocks.registerBlockType', 'extend-block-group/attribute/extend-styles', addSrcControlAttribute);

/**
 * Create HOC to add src attribute to block.
 */
const withSrcAttribute = createHigherOrderComponent(BlockEdit => {
  return props => {
    // Do nothing if it's another block than our defined ones.
    if (! enableOnBlocks.includes(props.name)) {
      return (
        <BlockEdit { ...props } />
      );
    }

    const { customEnumeration } = props.attributes;
    let pannelControl;

    if (props.attributes.ordered) {
      props.setAttributes({
        customChecked: false,
        className: props.attributes.className.replace('rich__list--checked', ''),
      });
      pannelControl =
        <PanelBody
          title={ __('Style Controls') }
          initialOpen={ true }
        >
          <ToggleControl
            label="Numbered sublists"
            help="1 1.1 1.1.1"
            checked={ customEnumeration }
            onChange={newCustomEnumeration => {
              props.setAttributes({
                customEnumeration: !!newCustomEnumeration,
                className: newCustomEnumeration ? 'rich__list--enumerated' : '',
              });
            }
            }
          />
        </PanelBody>;
    }

    if (!props.attributes.ordered) {
      props.setAttributes({
        customEnumeration: false,
        className: props.attributes.className.replace('rich__list--enumerated', ''),
      });
    }
    return (
      <Fragment>
        <BlockEdit { ...props } />
        <InspectorControls>
          {pannelControl}
        </InspectorControls>
      </Fragment>
    );
  };
}, 'withSrcAttribute');

addFilter('editor.BlockEdit', 'extend-block-group/with-column-layout', withSrcAttribute);


/**
 * Add margin style attribute to save element of block.
 *
 * @param {object} saveElementProps Props of save element.
 * @param {Object} blockType Block type information.
 * @param {Object} attributes Attributes of block.
 *
 * @returns {object} Modified props of save element.
 */
const addSizeExtraProps = (saveElementProps, blockType) => {
  // Do nothing if it's another block than our defined ones.
  if (! enableOnBlocks.includes(blockType.name)) {
    return saveElementProps;
  }


  return saveElementProps;
};

addFilter('blocks.getSaveContent.extraProps', 'extend-block-group/get-save-content/extra-props', addSizeExtraProps);
