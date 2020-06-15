import React from 'react'
import {components, editor, element, i18n} from 'wp'
import {useMedia} from 'the-platform'

// import "slick-carousel/slick/slick.css"
// import "slick-carousel/slick/slick-theme.css"
import './style.scss'

const { Fragment } = element
const { __ } = i18n

const { PanelBody, TextControl, ToggleControl, RadioControl, IconButton } = components
const { RichText, BlockControls, MediaUpload, InspectorControls, MediaPlaceholder, Toolbar } = editor

export const name = 'coliquio-slideshow'
console.log(name);

/**
 * @todo: DRY!
 * @param defaultClassName
 * @param attributes
 * @returns {string}
 */
function renderClassName(defaultClassName, attributes) {
  let className = defaultClassName
  if (attributes.style != 'button') {
    className = `${className} ${className}--${attributes.style}`
  }
  return className
}

export const settings = {
  title: __('Image Slideshow'),

  description: __('Simple slideshow'),

  icon: 'image',

  attributes: {
    images: {
      type: 'array',
    }
  },

  edit({ attributes, className, setAttributes }) {

    const hasImages = attributes.images && !!attributes.images.length;
    console.log('imgs', attributes.images)

    const onSelectImages = (imgs) => {
      setAttributes({
        images: imgs,
      })
    }
    const isDesktop = useMedia('(min-width: 400px)');

    return (
        <div className={className}>

          <p>isDesktop: {isDesktop.toString()}</p>
          <div className="container">
            {
              hasImages && attributes.images.map(img => (
                  <figure key={img.id}>
                    <img className="" width="100" src={img.url} alt={img.alt}/>
                    <RichText
                        tagName="figcaption"
                        placeholder={__('Bildbeschreibung')}
                        value={img.caption}
                        onChange={(newCaption) =>
                            setAttributes({ caption: newCaption })
                        }
                        inlineToolbar
                    />
                  </figure>
              ))
            }
          </div>


          <MediaPlaceholder
              addToGallery={hasImages}
              isAppender={hasImages}
              className={className}
              // disableMediaButtons={ hasImages && ! isSelected }
              icon={!hasImages && 'dashicons-images-alt'}
              labels={{
                title: !hasImages && __('Image Slide Gallery'),
                instructions: !hasImages && 'Bilder bitte auswählen',
              }}
              onSelect={onSelectImages}
              accept="image/*"
              allowedTypes={['image']}
              value={attributes.images}
              onError={alert}
              multiple
              // notices={ hasImages ? undefined : noticeUI }
              // onFocus={ this.props.onFocus }
          />

        </div>
    )
  },

  save({ attributes, className }) {

    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    const isDesktop = useMedia('(min-width: 400px)');

return (
    <p>isDesktop: {isDesktop.toString()}</p>
)
    // return (
        // <Slider {...settings}>
        //   {
        //     attributes.images.length > 0 && attributes.images.map(img => (
        //         <div key={img.id}>
        //           <img src={img.url} alt={img.alt}/>
        //         </div>
        //     ))
        //   }
        // </Slider>
    // );
  },
}
