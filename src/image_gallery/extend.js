import React from 'react'
import assign from 'lodash.assign';

const { createHigherOrderComponent } = wp.compose;
const { InspectorControls } = wp.editor;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;
const { PanelBody, TextControl, Disabled } = wp.components;
const { useSelect } = wp.data;

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
const withCustomFeatures = createHigherOrderComponent( ( BlockEdit ) => {
  return ( props ) => {
    // Do nothing if it's another block than our defined ones.
    if ( ! enableOnBlocks.includes( props.name ) ) {
      return (
        <BlockEdit { ...props } />
      );
    }

    // const image = useSelect(
    //   ( select ) => {
    //     const { getMedia } = select( 'core' );
    //     return props.attributes.images.length ? getMedia( props.attributes.id ) : null;
    //   },
    //   [ props.attributes.id, props.isSelected ]
    // );

    



    // transform image caption to satisfy validation rules
    if (props.attributes.images && props.attributes.images.length) {


      const images = useSelect(
        ( select ) => {
          const { getMedia } = select( 'core' );
          return props.attributes.images ? props.attributes.images.map(i => getMedia(i.id)) : null;
        },
          [ props.attributes.images, props.attributes.images.map(i => i.id) ]
        );

        props.attributes.images.map((image, i) => {
            if (typeof image.caption === 'object') {
                image.caption = image.caption.raw ? image.caption.raw : undefined
            }

            if (images && images[i] && images[i].media_fields && images[i].media_fields.field_copyright) {
              image.copyright = images[i].media_fields ? images[i].media_fields.field_copyright.value.value : '';
            }

            if (images && images[i] && images[i].media_details && image.url != images[i].media_details.cdn_url) {
              
                image.url = images[i].media_details.crops.teaser.cdn_url;
                image.cdnFileId = images[i].media_details.cdn_file_id;
                image.width = undefined;
                image.imageheight = undefined;
                image.sizeSlug = undefined;
                image.crop = null;
                image.link = undefined;
                image.aspectRatio = images[i].media_details.crops.teaser.aspect_ratio;
                image.zoomImage = {
                  url: images[i].media_details.cdn_url,
                  aspectRatio: {
                    width: images[i].media_details.width,
                    height: images[i].media_details.height
                  }
                };
              
            }
            return image;
        });
    }

    return (
      <Fragment>
        <BlockEdit { ...props }/>
        
        <InspectorControls>
          <PanelBody
              title={ __( 'Custom Control' ) }
              initialOpen={ true }
            >
              {props.attributes.images.map((item, index)=>{
                  return 
                  <Disabled>
                    <TextControl
                      key={ index }
                      label={__('Copyright ')}
                      help={__('Could be changed in gallery')}
                      value={props.attributes.images[index].copyright}
                    />
                  </Disabled>
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

  // if ( attributes.copyright && saveElementProps.children && saveElementProps.children.props) {
  //     saveElementProps.children.props.children.push(
  //         React.createElement(
  //             "span", // type
  //             { type: "text" }, // props
  //             attributes.copyright // children
  //           )
  //     );
  // }

  return saveElementProps;
};

addFilter( 'blocks.getSaveContent.extraProps', 'extend-block-image/get-save-content/extra-props', addExtraProps );
