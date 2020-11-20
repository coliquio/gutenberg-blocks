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

// unregisterBlockStyle('core/image', 'rounded');

// unregisterBlockStyle( 'core/quote', 'large' );


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

const disabledElements = [
  {
    text: 'Styles',
    selector: '.components-panel__body>h2>button',
  },
  {
    text: 'Image size',
    selector: '.components-base-control__label',
  }
];
const disabledElementsSelectors = ['Styles', ];

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
    crop: {
      type: 'object',
      default: null
    },
    aspectRatio: {
      type: 'object',
      default: null
    }
  });

  return settings;
};

addFilter( 'blocks.registerBlockType', 'extend-block-image/attribute/src', addSrcControlAttribute );

function getCropOptions(image) {
  return [{
    label: __( '---'),
    value: undefined
  }].concat(image && image.media_details && image.media_details.crops ? Object.keys(image.media_details.crops).map(key => {
    const crop = image.media_details.crops[key]
    return {
      label: __( crop.label + '  ' + (crop.description || '') ),
      value: crop.name
    }
  }) : [])
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

    // let a = document.querySelectorAll('.components-panel__body>h2>button');
    // let b = document.querySelectorAll('.components-base-control__label');
    disabledElements.forEach(el => {
      const temp = document.querySelectorAll(el.selector);
      temp.forEach(node => {
        if (el.text === node.innerText && !node.parentNode.parentNode.className.includes('custom-hidden')) {
          node.parentNode.parentNode.className += ' custom-hidden';
        }
      });
    });   

    const { size, copyright } = props.attributes;

    // add has-size-xy class to block
    if ( size ) {
        props.setAttributes( {
          className: `custom-size-${ size }`,
        });
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
                props.setAttributes( {
                  size: selectedsizeOption,
                } );
              } }
            />
            <SelectControl
              label={ __( 'Crop' ) }
              value={ props.attributes.crop ? props.attributes.crop.name : undefined }
              options={ getCropOptions(image) }
              onChange={ ( selectedCrop ) => {
                const crop = getCrop(image, selectedCrop)
                props.setAttributes( {
                  url: crop ? crop.cdn_url : image.media_details.original_cdn_url,
                  width: undefined,
                  height: undefined,
                  sizeSlug: undefined,
                  crop: (crop ? {
                    name: crop.name,
                    width: crop.width,
                    height: crop.height,
                    x: crop.x,
                    y: crop.y
                  } : null),
                  aspectRatio: {
                    width: crop ? crop.aspect_ratio_width : image.media_details.width,
                    height: crop ? crop.aspect_ratio_height : image.media_details.height
                  }
                } );
              } }
            />
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  };
}, 'withSrcAttribute' );

addFilter( 'editor.BlockEdit', 'extend-block-image/with-src-attribute', withSrcAttribute );


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

addFilter( 'blocks.getSaveContent.extraProps', 'extend-block-image/get-save-content/extra-props', addSizeExtraProps );
