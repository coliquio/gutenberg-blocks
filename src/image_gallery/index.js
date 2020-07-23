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
                <span className="heading">Fotostrecke</span>
                <span className="gallery-title">{attributes.galleryTitle || ''}</span>
              </div>
              <div className="amount">
                <svg className="images-icon" width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.3125 9.78125C10.3125 10.1719 10.1758 10.5039 9.90234 10.7773C9.62891 11.0508 9.29688 11.1875 8.90625 11.1875H1.40625C1.01562 11.1875 0.683594 11.0508 0.410156 10.7773C0.136719 10.5039 0 10.1719 0 9.78125V2.28125C0 1.89063 0.136719 1.55859 0.410156 1.28516C0.683594 1.01172 1.01562 0.875 1.40625 0.875H8.90625C9.29688 0.875 9.62891 1.01172 9.90234 1.28516C10.1758 1.55859 10.3125 1.89063 10.3125 2.28125V9.78125ZM13.5938 5.5625C13.9844 5.5625 14.3164 5.69922 14.5898 5.97266C14.8633 6.24609 15 6.57812 15 6.96875V14.4688C15 14.8594 14.8633 15.1914 14.5898 15.4648C14.3164 15.7383 13.9844 15.875 13.5938 15.875H6.09375C5.70312 15.875 5.37109 15.7383 5.09766 15.4648C4.82422 15.1914 4.6875 14.8594 4.6875 14.4688V12.125H6.5625V14H13.125V7.4375H11.25V5.5625H13.5938Z" />
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
