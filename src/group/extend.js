import React from 'react';
import assign from 'lodash.assign';
import { blockEditor, components, compose, element, hooks, i18n } from 'wp';


const { createHigherOrderComponent } = compose;
const { Fragment } = element;
const { addFilter } = hooks;
const { __ } = i18n;
const { InspectorControls } = blockEditor;
const { PanelBody, CheckboxControl } = components;

// Enable properties on the following blocks
const enableOnBlocks = [
  'core/group',
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
    classNameTest: {
      type: 'string',
      default: '',
    },
    test: {
      type: 'string',
      default: '',
    },
    isChecked: {
      type: 'boolean',
      default: false,
    },
  });

  return settings;
};

addFilter('blocks.registerBlockType', 'extend-block-group/attribute/column-layout', addSrcControlAttribute);

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

    console.log(props.attributes);
    const { isChecked } = props.attributes;

    return (
      <Fragment>
        <BlockEdit { ...props } />
        <InspectorControls>
          <PanelBody
            title={ __('Sizing Control') }
            initialOpen={ true }
          >
            <CheckboxControl
              heading="Column layout"
              label="Column layout for text in the group"
              help="Enable/disable elements to be shown in column layout"
              checked={ isChecked }
              onChange={isChecked, test => {
                console.log(isChecked, test);
                props.setAttributes({ isChecked: !isChecked });
              }
              }
            />
          </PanelBody>
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
const addSizeExtraProps = (saveElementProps, blockType, attributes) => {
  // Do nothing if it's another block than our defined ones.
  if (! enableOnBlocks.includes(blockType.name)) {
    return saveElementProps;
  }

  if (attributes.test) {
    // eslint-disable-next-line no-debugger
    debugger;
  }
  return saveElementProps;
};

addFilter('blocks.getSaveContent.extraProps', 'extend-block-group/get-save-content/extra-props', addSizeExtraProps);
