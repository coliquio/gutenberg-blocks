import React from 'react'
import assign from 'lodash.assign';

const { createHigherOrderComponent } = wp.compose;
const { InspectorControls } = wp.editor;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;
const { PanelBody, TextControl } = wp.components;

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
    copyrights: {
      type: 'array',
      default: [],
    }
  } );

  return settings;
};

addFilter( 'blocks.registerBlockType', 'extend-block-group/attribute/column-layout', addSrcControlAttribute );

/**
 * Create HOC to add src attribute to block.
 */
const withCustomFeatures = createHigherOrderComponent( ( BlockEdit ) => {
  return ( props ) => {
    // Do nothing if it's another block than our defined ones.
    if ( ! enableOnBlocks.includes( props.name ) ) {
      return (
        <BlockEdit { ...props } />
      );
    }
    console.log('new');
    

    // transform image caption to satisfy validation rules
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
          console.log('changed');
            props.setAttributes({
                images: temp
            });
        }
    }

    return (
      <Fragment>
        <BlockEdit { ...props }/>
        {props.attributes.copyrights.map((item, index)=>{
                  return <span>{ item } { index }</span>
              })}
        
        <InspectorControls>
          <PanelBody
              title={ __( 'Custom Control' ) }
              initialOpen={ true }
            >
              {props.attributes.images.map((item, index)=>{
                  return <TextControl
                      key={ index }
                      label={__('Copyright ')}
                      value={props.attributes.copyrights[index]}
                      onChange={copyright => {
                        
                        let temp = props.attributes.copyrights;
                        temp[index] = copyright;

                        props.setAttributes({
                          copyrights: temp
                        });

                        console.log('props inside ', props);
                      }}
                  />
              })}
              
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  };
}, 'withCustomFeatures' );

addFilter( 'editor.BlockEdit', 'extend-block-gallery/with-custom-features', withCustomFeatures );



/**
 * Add margin style attribute to save element of block.
 *
 * @param {object} saveElementProps Props of save element.
 * @param {Object} blockType Block type information.
 * @param {Object} attributes Attributes of block.
 *
 * @returns {object} Modified props of save element.
 */
const addExtraProps = ( saveElementProps, blockType, attributes ) => {
  if ( ! enableOnBlocks.includes( blockType.name ) ) {
      return saveElementProps;
  }
  wp.blocks.unregisterBlockStyle('core/image', 'rounded');
  wp.blocks.unregisterBlockStyle('core/image', 'default');

  saveElementProps.className += attributes.classNameZoom;

  if ( attributes.copyright && saveElementProps.children && saveElementProps.children.props) {
      saveElementProps.children.props.children.push(
          React.createElement(
              "span", // type
              { type: "text" }, // props
              attributes.copyright // children
            )
      );
  }

  return saveElementProps;
};

addFilter( 'blocks.getSaveContent.extraProps', 'extend-block-image/get-save-content/extra-props', addExtraProps );
