import React, {useState} from 'react'
import {components, editor, element, i18n} from 'wp'
import {useMedia} from 'the-platform';
import './style.scss'

const { Fragment } = element
const { __ } = i18n

const { PanelBody, TextControl, ToggleControl, RadioControl, IconButton } = components
const { RichText, BlockControls, MediaUpload, InspectorControls, MediaPlaceholder, Toolbar } = editor

export const name = 'coliquio-image-gallery'

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


const Gal = () => {
  const isDesktop = useMedia('(min-width: 400px)');

  return (<div>
    <h2>isDesktop: {isDesktop.toString()}</h2>
  </div>)
}
export const settings = {
  title: __('Image Gallery'),

  description: __('Simple Gallery that opens as an overlay'),

  icon: 'image',

  attributes: {
    images: {
      type: 'array',
    }
  },

  edit({ attributes, className, setAttributes }) {
    const hasImages = attributes.images && !!attributes.images.length;
    const onSelectImages = (imgs) => {
      setAttributes({
        images: imgs,
      })
    }
    const onChangeCaption = (newCaption, id) => {
      const { images } = attributes;

      for (let imgObj in images) {
        if (images[imgObj].id === id) {
          images[imgObj].caption = newCaption;
        }
      }
      return setAttributes({ images });
    }

    return (
        <div className={className}>
          {/*<Gal/>*/}
          <div className="container preview ">
            {
              hasImages && attributes.images.map(img => (
                  <figure key={img.id}>
                    <img className="" width="90" src={img.url} alt={img.alt}/>
                    <RichText
                        tagName="figcaption"
                        placeholder={__('Caption')}
                        value={img.caption}
                        inlineToolbar
                        onChange={caption => onChangeCaption(caption, img.id)}
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
                title: !hasImages && __('Image Gallery'),
                instructions: !hasImages && 'Bitte Bilder auswählen',
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

    // const [open, setOpen] = useState(false);

    const len = attributes.images.length;
    return (

        <div className={className}>
          <button className="openGallery" onClick={() => {}}>
            Öffne Bildergallery
          </button>

          <p>open?: {open.toString()}</p>

          <div className="container">
            <p className="amount">{len} Bilder</p>
            {
              len > 0 && attributes.images.map((img, inx) => (
                  <figure key={img.id}>
                    <img src={img.url} alt={img.alt} />
                    <figcaption>
                      <span className="count">{`${(inx+1).toString()} / ${len}`}</span>
                      <p className="desc" dangerouslySetInnerHTML={{__html: img.caption}} />
                    </figcaption>
                  </figure>
              ))
            }
          </div>

        </div>


    )
  },
}
