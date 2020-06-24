import {blocks, data, i18n} from 'wp'
import * as accordionBlock from './accordion'
import * as accordionItemBlock from './accordion-item'
import * as checklist from './checklist'
import * as ctaBlock from './cta'
import * as highlight from './highlight'
import * as imageBlock from './image'
import * as imageSlideshow from './image_gallery'
import * as iframe from './iframe'

const { registerBlockType } = blocks
const { dispatch, select } = data
const { __ } = i18n

const colBlocks = [
  accordionBlock,
  accordionItemBlock,
  checklist,
  ctaBlock,
  highlight,
  imageBlock,
  imageSlideshow,
  iframe,
]

// Category name and slug
const category = {
  slug: 'coliquio', // needs to match the css class of the block container: ".wp-block-coliquio-[block-name]"
  title: __('coliquio Blocks'),
}

// Register the new category and blocks
export function registerBlocks() {
  const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug)
  dispatch('core/blocks').setCategories([category, ...currentCategories])

  colBlocks.forEach(block => {
    registerBlockType(`${category.slug}/${block.name}`, { category: category.slug, ...block.settings })
  })

}

registerBlocks()
