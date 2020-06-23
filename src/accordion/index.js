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

const { RichText, InnerBlocks } = editor

export const name = 'accordion'

const ALLOWED_BLOCKS = [ 'coliquio/accordion-item' ];

export const settings = {
  title: __('Accordion'),

  description: __('A custom Accordion block for Gutenberg Cloud'),

  icon: 'excerpt-view',

  attributes: {
    accordionTitle: {
      type: 'string',
    },
  },

  edit({ attributes, className, setAttributes }) {
    return (
      <Fragment>
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
      <div>
        <summary class="accordion-header">
          <RichText.Content
            value={ attributes.accordionTitle }
          />
        </summary>
        <div>
          <InnerBlocks.Content />
        </div>
      </div>
    )
  },
}
