import React from 'react'
import assign from 'lodash.assign'
import get from 'lodash.get'
import reduce from 'lodash.reduce'
import filter from 'lodash.filter'
import isEqual from 'lodash.isequal'
import './style.scss'


const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;
const { InspectorControls, MediaUpload, MediaUploadCheck } = wp.editor;
const { PanelBody, SelectControl, TextControl, Disabled, Button, ResponsiveWrapper } = wp.components;
const { useSelect } = wp.data;

// Enable properties on the following blocks
const enableOnBlocks = [
  'core/image',
];

const sizeControlOptions = [
  {
    label: __( 'XS' ),
    value: 'extra-small',
    widthPer: '16%',
    widthPx: '155px',
  },
  {
    label: __( 'S' ),
    value: 'small',
    default: true,
    widthPer: '25%',
    widthPx: '196px',
  },
  {
    label: __( 'M' ),
    value: 'medium',
    widthPer: '33%',
    widthPx: '250px',
  },
  {
    label: __( 'L' ),
    value: 'large',
    widthPer: '50%',
    widthPx: '360px',
  },
  {
    label: __( 'XL' ),
    value: 'extra-large',
    widthPer: '100%',
    widthPx: '720px',
  },
];

const layoutControlOptions = [
  {
    label: __( 'Default' ),
    value: undefined,
  },
  {
    label: __( 'Column' ),
    value: 'layout-column',
  },
  {
    label: __( 'Branding' ),
    value: 'branding-block',
  },
];

const disabledElements = [
  {
    text: 'Image size',
    selector: '.components-base-control__label',
  },
  {
    text: 'Image dimensions',
    selector: '.block-editor-image-size-control__row',
  }
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
  
  settings.attributes = assign( settings.attributes, {
    src: {
      type: 'string',
      default: '',
    },
    className: {
      type: 'string',
      default: '',
    },
    selectedCrop: {
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
    cdnFileId: {
      type: 'string',
      default: undefined,
    },
    size: {
      type: 'string',
    },
    layout: {
      type: 'string',
      default: undefined,
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
    },
    zoomImage: {
      type: 'object',
      default: null
    },
    magnification: {
      type: 'bool',
      default: false,
    },
    caption: {
      type: 'string',
      default: undefined,
    },
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
      label: __( crop.label + (crop.description ? ' - ' + crop.description : '') ),
      value: crop.name
    }
  }) : [])
}

function getCopyright(image) {
  return image && image.media_fields ? image.media_fields.field_copyright.value.value : '';
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

    setTimeout(function() { 
      disabledElements.forEach(el => {
        const temp = document.querySelectorAll(el.selector);
        temp.forEach(node => {
          if (el.text === node.innerText && !node.parentNode.parentNode.className.includes('custom-hidden')) {
            node.parentNode.parentNode.className += ' custom-hidden';
          }
        });
      });
      
      if (props.attributes.layout === 'layout-column') {
        let imageWrapper = document.getElementById('block-' + props.clientId).parentNode;

        if (imageWrapper.dataset.align === 'left') {
          let nextSibl = imageWrapper.nextSibling;
          if (nextSibl.nodeName === 'P') {
            nextSibl.style.paddingLeft = sizeControlOptions.find(o => o.value === props.attributes.size).widthPx;
            nextSibl.style.paddingRight = 0;
          }
          if (nextSibl.nodeName === 'DIV') {
            nextSibl.style.marginLeft = sizeControlOptions.find(o => o.value === props.attributes.size).widthPx;
            nextSibl.style.marginRight = 0;
          }
        }
        if (imageWrapper.dataset.align === 'right') {
          let nextSibl = imageWrapper.nextSibling;
          if (nextSibl.nodeName === 'P') {
            nextSibl.style.paddingRight = sizeControlOptions.find(o => o.value === props.attributes.size).widthPx;
            nextSibl.style.paddingLeft = 0;
          }
          if (nextSibl.nodeName === 'DIV') {
            nextSibl.style.marginRight = sizeControlOptions.find(o => o.value === props.attributes.size).widthPx;
            nextSibl.style.marginLeft = 0;
          }
        }

      }

  
     }, 50);
    

    const updateImageProps = (image, crop) => {

      if (typeof props.attributes.caption === 'object') {

        props.setAttributes({
          caption: props.attributes.caption.raw ? props.attributes.caption.raw : undefined
        });

      }

      if (image && image.media_details) {

        let crop = null;
        if (props.attributes.selectedCrop) {
          crop = getCrop(image, props.attributes.selectedCrop);
        }

        let propsToUpdate = {
          id: image.id,
          url: crop ? crop.cdn_url : get(image, 'media_details.cdn_url'),
          cdnFileId: get(image, 'media_details.cdn_file_id'),
          width: undefined,
          height: undefined,
          sizeSlug: undefined,
          alt: get(image, 'media_fields.field_media_image.value.alt'),
          copyright: get(image, 'media_fields.field_copyright.value.value'),
          size: !props.attributes.size ? sizeControlOptions.find(o => o.default).value : props.attributes.size,
          className: !props.attributes.size ? `custom-size-${ sizeControlOptions.find(o => o.default).value }` : props.attributes.className,
          crop: (crop ? {
            name: crop.name,
            width: crop.width,
            height: crop.height,
            x: crop.x,
            y: crop.y
          } : null),
          aspectRatio: {
            width: (crop && crop.aspect_ratio) ? crop.aspect_ratio.width : get(image, 'media_details.width'),
            height: (crop && crop.aspect_ratio) ? crop.aspect_ratio.height : get(image, 'media_details.height')
          },
          zoomImage: {
            url: get(image, 'media_details.cdn_url'),
            aspectRatio: {
              width: get(image, 'media_details.width'),
              height: get(image, 'media_details.height')
            }
          }
        };
  
        let reducedPropsToUpdate = reduce(propsToUpdate, function(result, value, key) {
          isEqual(value, props.attributes[key]) && !!value ?
            false : (result[key] || (result[key] = value));
          return result;
        }, {});
  
        if (Object.keys(reducedPropsToUpdate).length) {
          console.log('SET ATTR CORE/IMG');
          console.log(Object.keys(reducedPropsToUpdate));
          props.setAttributes(reducedPropsToUpdate);
        }

      }
    }

    const image = useSelect(
      ( select ) => {
        const { getMedia } = select( 'core' );
        return props.attributes.id && props.isSelected ? getMedia( props.attributes.id ) : null;
      },
      [ props.attributes.id, props.isSelected ]
    );

    updateImageProps(image);    

    const removeMedia = () => {
      props.setAttributes({
        id: 0,
        url: ''
      });
    }
   
    const blockStyle = {
      backgroundImage: props.attributes.mediaUrl != '' ? 'url("' + props.attributes.mediaUrl + '")' : 'none'
    };

    return (
      <Fragment>
        <BlockEdit { ...props } />
        <InspectorControls>
          <PanelBody
            title={ __( 'Custom Control' ) }
            initialOpen={ true }
          >
            <SelectControl
              label={ __( 'Sizing' ) }
              value={ props.attributes.size }
              options={ sizeControlOptions }
              onChange={ ( selectedsizeOption ) => {
                props.setAttributes( {
                  size: selectedsizeOption,
                } );
                props.setAttributes( {
                  className: `custom-size-${ selectedsizeOption }`,
                });
              } }
            />
            <SelectControl
              label={ __( 'Crop' ) }
              value={ props.attributes.crop ? props.attributes.crop.name : undefined }
              options={ getCropOptions(image) }
              onChange={ ( selectedCrop ) => {
                props.setAttributes({
                  selectedCrop
                });
              } }
            />
            <SelectControl
                label={__('Magnification')}
                value={ props.attributes.magnification }
                options={[{label: __('DISABLED'), value: false}, {label: __('ENABLED'), value: true}]}
                onChange={ ( magnification ) => {
                  props.setAttributes({ magnification });
                }}
            />

            <SelectControl
              label={ __( 'Layout' ) }
              value={ props.attributes.layout }
              options={ layoutControlOptions }
              onChange={ ( layout ) => {
                props.setAttributes( {
                  layout,
                } );
              } }
            />

            <div className="editor-post-featured-image">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={updateImageProps}
								value={props.attributes.mediaId}
								allowedTypes={ ['image'] }
								render={({open}) => (
									<Button 
										className={props.attributes.mediaId == 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
										onClick={open}
									>
										{props.attributes.mediaId == 0 && __('Choose an image', 'awp')}
										{props.media != undefined && 
                      <ResponsiveWrapper
                        naturalWidth={ props.media.media_details.width }
											  naturalHeight={ props.media.media_details.height }
                      >
                        <img src={props.media.source_url} />
                      </ResponsiveWrapper>
						            		}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						{props.attributes.mediaId != 0 && 
							<MediaUploadCheck>
								<MediaUpload
									title={__('Replace image', 'awp')}
									value={props.attributes.mediaId}
									onSelect={updateImageProps}
									allowedTypes={['image']}
									render={({open}) => (
										<Button onClick={open} isDefault isLarge>{__('Replace image', 'awp')}</Button>
									)}
								/>
							</MediaUploadCheck>
						}
						{props.attributes.mediaId != 0 && 
							<MediaUploadCheck>
								<Button onClick={removeMedia} isLink isDestructive>{__('Remove image', 'awp')}</Button>
							</MediaUploadCheck>
						}
					</div>


            <Disabled>
              <TextControl
                label={__('Copyright')}
                help={__('Could be changed in gallery')}
                value={getCopyright(image)}
              />
            </Disabled>
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
const addExtraProps = ( saveElementProps, blockType, attributes ) => {
    if ( ! enableOnBlocks.includes( blockType.name ) ) {
        return saveElementProps;
    }
    wp.blocks.unregisterBlockStyle('core/image', 'rounded');
    wp.blocks.unregisterBlockStyle('core/image', 'default');   

    return saveElementProps;
};

addFilter( 'blocks.getSaveContent.extraProps', 'extend-block-image/get-save-content/extra-props', addExtraProps );