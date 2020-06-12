/**
 * External dependencies
 */
import React from 'react'
import { components, editor, element, i18n } from 'wp'
/**
 * Internal dependencies
 */
import './style.scss'


const { Fragment } = element
const { __ } = i18n

const { PanelBody, RangeControl, ToggleControl } = components
const { BlockControls, RichText, AlignmentToolbar, InnerBlocks, InspectorControls } = editor

export const name = 'accordion-item'

const ALLOWED_BLOCKS = [ 'core/image', 'core/paragraph' ];

export const settings = {
  title: __('Accordion Item'),

  description: __('A custom Accordion block for Gutenberg Cloud'),

  icon: 'cover-image',

  attributes: {
    src: {
      type: 'string',
    },
    alt: {
      type: 'string',
    },
    caption: {
      type: 'string',
    },
    accordionTitle: {
      type: 'string',
    },
    accordionText: {
      type: 'string',
    },
    accordionOpen: {
      type: 'boolean',
		  default: false,
    }
  },

  edit({ attributes, className, setAttributes }) {
    return (
      <Fragment>
        <BlockControls key="controls">
          <AlignmentToolbar
            value={ attributes.accordionAlignment }
            onChange={ ( value ) =>
              setAttributes( {
                accordionAlignment: value,
              } )
            }
          />
        </BlockControls>
        
        <InspectorControls key="inspector">
          <PanelBody>
            <RangeControl
              label={ __( 'Title Font Size', 'atomic-blocks' ) }
              value={ attributes.accordionFontSize }
              onChange={ ( value ) =>
                setAttributes( {
                  accordionFontSize: value,
                } )
              }
              min={ 14 }
              max={ 24 }
              step={ 1 }
            />
            <ToggleControl
              label={ __( 'Open by default', 'atomic-blocks' ) }
              checked={ attributes.accordionOpen }
              onChange={ () =>
                setAttributes( {
                  accordionOpen: ! attributes
                    .accordionOpen,
                } )
              }
            />
          </PanelBody>
        </InspectorControls>
        <RichText
          tagName="p"
          placeholder={ __( 'Accordion Title' ) }
          value={ attributes.accordionTitle }
          className=""
          onChange={ ( value ) =>
            setAttributes( { accordionTitle: value } )
          }
        />

        <div className="ab-accordion-text">
          <InnerBlocks
            allowedBlocks={ ALLOWED_BLOCKS }
          />
        </div>
      </Fragment>
    )
  },

  save({ attributes, className }) {
    return (
      <details open={ attributes.accordionOpen }>
        <summary class="123">
          <RichText.Content
            value={ attributes.accordionTitle }
          />
        </summary>
        <div class="456">
          <InnerBlocks.Content />
        </div>
      </details>
    )
  },
}
