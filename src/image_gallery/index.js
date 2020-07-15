import React from 'react'
import {components, i18n, blockEditor} from 'wp'

import './style.scss'

const { __ } = i18n

const { PanelBody, TextControl } = components
const {RichText, MediaPlaceholder, InspectorControls} = blockEditor

export const name = 'image-gallery'

export const settings = {
  title: __('Image Gallery'),

  description: __('Simple image gallery that opens as an overlay'),

  icon: 'format-gallery',

  attributes: {
    images: {
      type: 'array',
    },
    galleryTitle: {
      type: 'string',
    }
  },

  edit({ attributes, className, setAttributes, isSelected }) {
    const hasImages = attributes.images && !!attributes.images.length;
    const onSelectImages = (imagesFromMediaBrowser) => {
      const images = imagesFromMediaBrowser.map(image => ({
        id: image.id,
        // @see Drupal image styles: /admin/config/media/image-styles
        url: (image.media_details && image.media_details.sizes && image.media_details.sizes.crop_full_2x_) ? image.media_details.sizes.crop_full_2x_.source_url : image.url,
        originalSource: image.url,
        caption: image.caption,
        alt: image.alt
      }))
      setAttributes({ images })
      // For debugging purpose within Drupal, please keep
      console.log('images from media browser', imagesFromMediaBrowser)
      console.log('setting images attribute', images)
    }
    const onChangeCaption = (newCaption, id) => {
      const { images } = attributes;
      images
          .filter(img => img.id === id)
          .forEach(img => img.caption = newCaption)

      return setAttributes({ images });
    }

    return (
        <>
          <InspectorControls>
            <PanelBody title={__('Gallery settings')}>
              <TextControl
                  label={__('Title of gallery')}
                  value={attributes.galleryTitle}
                  onChange={(val) => setAttributes({ galleryTitle: val })}
              />
            </PanelBody>
          </InspectorControls>
          <div className={className}>
            <div className="image-gallery-edit-container ">
              {
                !hasImages && <strong>{__('No images selected yet')}</strong>
              }
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
                disableMediaButtons={hasImages && !isSelected}
                icon={!hasImages && 'dashicons-images-alt'}
                labels={{
                  title: !hasImages && __('Image Gallery'),
                  instructions: !hasImages && __('Please select images'),
                }}
                onSelect={onSelectImages}
                accept="image/*"
                allowedTypes={['image', 'remote_image']}
                value={attributes.images}
                onError={alert}
                multiple
            />

          </div>
        </>
    )
  },


  save({ attributes, className }) {
    const len = attributes.images.length;
    const prevImg = attributes.images[0];
    const style = {
      backgroundImage: `url('${prevImg.url}')`
    }

    return (
        <div className={className}>
          <button className="btn btn-open-gallery" style={style}>
            <div className="txt-container">
              <div className="left">
                <span className="heading">Bildergalerie</span>
                <span className="gallery-title">{attributes.galleryTitle || ''}</span>
              </div>
              <div className="amount">
                <svg className="images-icon">
                  <path d="M528 32H112c-26.51 0-48 21.49-48 48v16H48c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48v-16h16c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm-48 400c0 8.822-7.178 16-16 16H48c-8.822 0-16-7.178-16-16V144c0-8.822 7.178-16 16-16h16v240c0 26.51 21.49 48 48 48h368v16zm64-64c0 8.822-7.178 16-16 16H112c-8.822 0-16-7.178-16-16V80c0-8.822 7.178-16 16-16h416c8.822 0 16 7.178 16 16v288zM176 200c30.928 0 56-25.072 56-56s-25.072-56-56-56-56 25.072-56 56 25.072 56 56 56zm0-80c13.234 0 24 10.766 24 24s-10.766 24-24 24-24-10.766-24-24 10.766-24 24-24zm240.971 23.029c-9.373-9.373-24.568-9.373-33.941 0L288 238.059l-31.029-31.03c-9.373-9.373-24.569-9.373-33.941 0l-88 88A24.002 24.002 0 0 0 128 312v28c0 6.627 5.373 12 12 12h360c6.627 0 12-5.373 12-12v-92c0-6.365-2.529-12.47-7.029-16.971l-88-88zM480 320H160v-4.686l80-80 48 48 112-112 80 80V320z" />
                </svg>
                {len} Bilder
              </div>
            </div>
          </button>
          <div className="image-gallery-overlay">
            <div className="header">
              <button className="btn btn-close-gallery">
                <svg className="arrow-icon">
                  <path d="M12,8l-6,6l1.41,1.41L12,10.83l4.59,4.58L18,14L12,8z"/>
                </svg>
                Zurück zum Beitrag
              </button>
            </div>
            <section>
              <p className="amount">{len} Bilder</p>
              <h2>{attributes.galleryTitle || ''}</h2>
              {
                len > 0 && attributes.images.map((img, inx) => (
                    <figure key={img.id}>
                      <img src={img.url} alt={img.alt}/>
                      <figcaption>
                        <span className="count">{`${(inx + 1).toString()}/${len}`}</span>
                        <p className="desc" dangerouslySetInnerHTML={{ __html: img.caption }}/>
                        <p className="copyright">{img.copyright}</p>
                      </figcaption>
                    </figure>
                ))
              }
              <button className="btn btn-close-gallery bottom">
                <span className="close-icon">X</span>
                Schliessen
              </button>
            </section>
          </div>
        </div>
    )
  },
}
