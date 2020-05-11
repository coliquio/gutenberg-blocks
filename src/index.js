import { blocks, data, i18n } from 'wp'
import * as imageBlock from './image'

const { registerBlockType } = blocks
const { dispatch, select } = data
const { __ } = i18n


// Category name and slug
const category = {
  slug: 'coliquio', // needs to match the css class of the block container: ".wp-block-coliquio-[block-name]"
  title: __('Coliquio Blocks'),
}

// Register the new category and blocks
export function registerBlocks() {
  const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug)
  dispatch('core/blocks').setCategories([category, ...currentCategories])

  registerBlockType(`${category.slug}/${imageBlock.name}`, { category: category.slug, ...imageBlock.settings })
}

registerBlocks()
