import React from 'react'
import assign from 'lodash.assign'
import get from 'lodash.get'
import './style.scss'
import domReady from '@wordpress/dom-ready'

const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;
const { InspectorControls, MediaUpload, MediaUploadCheck } = wp.editor;
const { PanelBody, SelectControl, TextControl, Disabled, Button, ResponsiveWrapper } = wp.components;
const { useSelect } = wp.data;


domReady( function() {
  console.log('domReady');
} );

// Enable properties on the following blocks
const enableOnBlocks = [
  'core/image',
];

const sizeControlOptions = [
  {
    label: __( 'XS' ),
    value: 'extra-small',
  },
  {
    label: __( 'S' ),
    value: 'small',
    default: true,
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
    value: 'extra-large',
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
    classNameZoom: {
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
      console.log('disable');
      disabledElements.forEach(el => {
        console.log(el.selector);
        const temp = document.querySelectorAll(el.selector);
        console.log(temp);
        temp.forEach(node => {
          if (el.text === node.innerText && !node.parentNode.parentNode.className.includes('custom-hidden')) {
            node.parentNode.parentNode.className += ' custom-hidden';
          }
        });
      }); 
  
     }, 50);

    // add has-size-xy class to block
    if ( !props.attributes.size ) {
      props.setAttributes( {
        size: sizeControlOptions.find(o => o.default).value,
        className: `custom-size-${ sizeControlOptions.find(o => o.default).value }`,
      });
    }
    

    if (typeof props.attributes.caption === 'object') {
      props.setAttributes({
        caption: props.attributes.caption.raw ? props.attributes.caption.raw : undefined
      });
    }

    const image = useSelect(
      ( select ) => {
        const { getMedia } = select( 'core' );
        return props.attributes.id && props.isSelected ? getMedia( props.attributes.id ) : null;
      },
      [ props.attributes.id, props.isSelected ]
    );

    // ensure cdn url + file id is used always
    // TODO find if there is a better way doing this
    if (!props.attributes.crop && image && image.media_details && props.attributes.url != image.media_details.cdn_url) {
      props.setAttributes({
        url: image.media_details.cdn_url,
        cdnFileId: image.media_details.cdn_file_id,
        width: undefined,
        height: undefined,
        sizeSlug: undefined,
        crop: null,
        aspectRatio: {
          width: image.media_details.width,
          height: image.media_details.height
        },
        zoomImage: {
          url: image.media_details.cdn_url,
          aspectRatio: {
            width: image.media_details.width,
            height: image.media_details.height
          }
        }
      });
    }
    
    if (get(image, 'media_fields.field_copyright.value.value')) {
      props.setAttributes({
        copyright: get(image, 'media_fields.field_copyright.value.value')
      });
    }
    

    const removeMedia = () => {
      props.setAttributes({
        id: 0,
        url: ''
      });
    }
   
    const onSelectMedia = (media) => {
      // REFACTOR ME to avoid repetitions and make one setAttr out of all
      const propsToUpdate = {
        id: media.id,
        caption: get(media, 'caption.raw', undefined),
        copyright: get(media, 'media_fields.field_copyright.value.value'),
        url: get(media, 'media_details.cdn_url'),
        cdnFileId: media.media_details.cdn_file_id,
        width: undefined,
        height: undefined,
        sizeSlug: undefined,
        crop: null,
        aspectRatio: {
          width: get(media, 'media_details.width', undefined),
          height: get(media, 'media_details.height', undefined),
        },
        zoomImage: {
          url: get(media, 'media_details.cdn_url', undefined),
          aspectRatio: {
            width: get(media, 'media_details.width', undefined),
            height: get(media, 'media_details.height', undefined),
          }
        }
      };
      props.setAttributes(propsToUpdate);
      console.log(propsToUpdate);
    }
    
    console.log('this is set - ', get(image, 'media_fields.field_copyright.value.value'));
    props.setAttributes({
      copyright: get(image, 'media_fields.field_copyright.value.value')
    });
   
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
                const crop = getCrop(image, selectedCrop)
                props.setAttributes( {
                  url: crop ? crop.cdn_url : image.media_details.cdn_url,
                  cdnFileId: image.media_details.cdn_file_id,
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
                    width: (crop && crop.aspect_ratio) ? crop.aspect_ratio.width : image.media_details.width,
                    height: (crop && crop.aspect_ratio) ? crop.aspect_ratio.height : image.media_details.height
                  }
                } );
              } }
            />
            <SelectControl
                label={__('Magnification')}
                value={ props.attributes.magnification }
                options={[{label: __('DISABLED'), value: false}, {label: __('ENABLED'), value: true}]}
                onChange={ ( magnification ) => {
                  props.setAttributes({ magnification });
                  if (magnification === 'true') {
                    props.setAttributes({
                      classNameZoom: ' magnification-enabled',
                    });
                  } else {
                    props.setAttributes({
                      classNameZoom: '',
                    });
                  }
                }}
            />

            <div className="editor-post-featured-image">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onSelectMedia}
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
									onSelect={onSelectMedia}
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

    saveElementProps.className += attributes.classNameZoom;

    return saveElementProps;
};

addFilter( 'blocks.getSaveContent.extraProps', 'extend-block-image/get-save-content/extra-props', addExtraProps );