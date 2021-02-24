import React from 'react'
import assign from 'lodash.assign';

/**
 * Internal dependencies
 */
import './style.scss'

const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, ToggleControl } = wp.components;


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
const addSrcControlAttribute = ( settings, name ) => {

  // Do nothing if it's another block than our defined ones.
  if ( ! enableOnBlocks.includes( name ) ) {
    return settings;
  }

  // Use Lodash's assign to gracefully handle if attributes are undefined
  settings.attributes = assign( settings.attributes, {
    customEnumeration: {
      type: 'boolean',
      default: false,
    },
    className: {
      type: 'string',
      default: '',
    },
  } );

  return settings;
};

addFilter( 'blocks.registerBlockType', 'extend-block-group/attribute/extend-styles', addSrcControlAttribute );

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

    let { customEnumeration } = props.attributes;
    let pannelControl;

    if (props.attributes.ordered) {
      pannelControl =
        <PanelBody
          title={ __( 'Style Controls' ) }
          initialOpen={ true }
        >
          <ToggleControl
            label="Numbered sublists"
            help="1 1.1 1.1.1"
            checked={ customEnumeration }
            onChange={customEnumeration => {
              props.setAttributes({
                customEnumeration: !!customEnumeration,
                className: !!customEnumeration ? 'custom-enumeration' : ''
              })}
            }
          />
        </PanelBody>
    } else {
      props.setAttributes({
        customEnumeration: false,
        className: '',
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
}, 'withSrcAttribute' );

addFilter( 'editor.BlockEdit', 'extend-block-group/with-column-layout', withSrcAttribute );


/**
 * Add margin style attribute to save element of block.
 *
 * @param {object} saveElementProps Props of save element.
 * @param {Object} blockType Block type information.
 * @param {Object} attributes Attributes of block.
 *
 * @returns {object} Modified props of save element.
 */
const addSizeExtraProps = ( saveElementProps, blockType, attributes ) => {
    // Do nothing if it's another block than our defined ones.
    if ( ! enableOnBlocks.includes( blockType.name ) ) {
        return saveElementProps;
    }


    return saveElementProps;
};

addFilter( 'blocks.getSaveContent.extraProps', 'extend-block-group/get-save-content/extra-props', addSizeExtraProps );
