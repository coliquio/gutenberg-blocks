import React from 'react'
import assign from 'lodash.assign';

const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;
const { InspectorControls } = wp.editor;
const { PanelBody, SelectControl, TextControl } = wp.components;
const { unregisterBlockStyle } = wp.blocks;
const { useSelect } = wp.data;

// src in custom block has to be called url now
// url used for link should be href - as it's taken by src
//  

// registerBlockStyle( 'core/image' , {
//     name: 'default',
//     label: __( 'Default' ),
//     isDefault: true,
//   });

unregisterBlockStyle('core/image', 'rounded');

unregisterBlockStyle( 'core/quote', 'large' );


// Enable properties on the following blocks
const enableOnBlocks = [
  'core/image',
];

const sizeControlOptions = [
  {
    label: __( 'None' ),
    value: '',
    },
    {
    label: __( 'XS' ),
    value: 'x-small',
  },
  {
    label: __( 'S' ),
    value: 'small',
  },
  {
    label: __( 'M' ),
    value: 'medium',
  },
  {
    label: __( 'L' ),
    value: 'large',
    },
    {
    label: __( 'XL' ),
    value: 'x-large',
  },
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
    // debugger;
  // Use Lodash's assign to gracefully handle if attributes are undefined
  settings.attributes = assign( settings.attributes, {
    src: {
      type: 'string',
      default: '',
    },
    classNameTest: {
      type: 'string',
      default: '',
        },
        url: {
            type: 'string',
            default: '',
        },
        href: {
            type: 'string',
            default: '',
        },
        alt: {
            type: 'string',
            default: '',
        },
        height: {
            type: 'number',
            default: undefined,
        },
        width: {
            type: 'number',
            default: undefined,
        },
        size: {
          type: 'string',
          default: sizeControlOptions[ 0 ].value,
        },
        copyright: {
            type: 'string',
        },
        cropName: {
          type: 'string',
          default: undefined
        },
        cropX: {
          type: 'number',
          default: undefined
        },
        cropY: {
          type: 'number',
          default: undefined
        },
        cropWidth: {
          type: 'number',
          default: undefined
        },
        cropHeight: {
          type: 'number',
          default: undefined
        }
  } );

  return settings;
};

addFilter( 'blocks.registerBlockType', 'extend-block-image/attribute/src', addSrcControlAttribute );

function getCropOptions(image) {
  return Object.keys(image ? image.media_details.crops : {}).map(key => {
    return {
      label: __( image.media_details.crops[key].name ),
      value: image.media_details.crops[key].name
    }
  })
}

function getCrop(image, cropName) {
  if (!image) return
  const key = Object.keys(image.media_details.crops).find(key => {
    return image.media_details.crops[key].name === cropName
  })
  if (key) return image.media_details.crops[key]
}

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

    if (!(props.attributes.link !== undefined)) {
      return (
        <BlockEdit { ...props } />
      );
    }

    console.log('is subStr - ', props.attributes.className.includes('is-style-'));
    console.log('class name - ', props.attributes.className);
    console.log('props.attributes.link', props.attributes.link);
    console.log('END*******');
    

    const { size, copyright } = props.attributes;

    // add has-size-xy class to block
    if ( size ) {
        props.setAttributes( {
            className: `coliquio-size-${ size }`,
          } );
    //   props.attributes.className = `coliquio-size-${ size }`;
    }
    if (typeof props.attributes.caption === 'object') {
      props.setAttributes({
        caption: props.attributes.caption.raw ? props.attributes.caption.raw : undefined
      });
    }
    const {
      imageSizes,
      mediaUpload,
    } = useSelect( ( select ) => {
      const { getSettings } = select( 'core/block-editor' );
      return getSettings();
    } );
    const image = useSelect(
      ( select ) => {
        const { getMedia } = select( 'core' );
        return props.attributes.id && props.isSelected ? getMedia( props.attributes.id ) : null;
      },
      [ props.attributes.id, props.isSelected ]
    );
      console.log('createHigherOrderComponent - ', image);
    return (
      <Fragment>
        <BlockEdit { ...props } />
        <InspectorControls>
          <PanelBody
            title={ __( 'Sizing Control' ) }
            initialOpen={ true }
          >
            <TextControl
                label={__('Copyright')}
                value={copyright}
                onChange={copyright => props.setAttributes({ copyright })}
            />
            <SelectControl
              label={ __( 'Sizing' ) }
              value={ size }
              options={ sizeControlOptions }
              onChange={ ( selectedsizeOption ) => {
                  console.log(selectedsizeOption);
                props.setAttributes( {
                  size: selectedsizeOption,
                } );
              } }
            />
            <SelectControl
              label={ __( 'Crop' ) }
              value={ props.cropName }
              options={ getCropOptions(image) }
              onChange={ ( selectedCrop ) => {
                // TODO if selectedCrop is null or
                // -> put image.original_cdn_url 
                // -> aspectRatioWidth + aspectRatioHeight to the image.width + image.height
                const crop = getCrop(image, selectedCrop)
                props.setAttributes( {
                  url: crop.cdn_url,
                  width: undefined,
                  height: undefined,
                  sizeSlug: crop.style_name,
                  cropName: selectedCrop,
                  cropX: crop.x,
                  cropY: crop.y,
                  cropHeight: crop.height,
                  cropWidth: crop.width,
                  aspectRatioWidth: crop.aspect_ratio_width,
                  aspectRatioHeight: crop.aspect_ratio_height
                } );
              } }
            />
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  };
}, 'withSrcAttribute' );

addFilter( 'editor.BlockEdit', 'extend-block-src/with-src-attribute', withSrcAttribute );


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
    // console.log(attributes);

    if ( attributes.copyright ) {
        saveElementProps.children.props.children.push(
            React.createElement(
                "span", // type
                { type: "text" }, // props
                attributes.copyright // children
              )
        );
    }

    // if ( true ) {
    //     // Use Lodash's assign to gracefully handle if attributes are undefined
    //     assign( saveElementProps, { style: { 'margin-bottom': margins.large } } );
    // }
    // console.log(saveElementProps);
    return saveElementProps;
};

addFilter( 'blocks.getSaveContent.extraProps', 'extend-block-example/get-save-content/extra-props', addSizeExtraProps );
