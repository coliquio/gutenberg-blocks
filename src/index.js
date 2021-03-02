// import { blocks, data, i18n } from 'wp';

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

// import * as accordionBlock from './accordion';
// import * as accordionItemBlock from './accordion-item';
// import * as brandingBlock from './branding';
// import * as checklist from './checklist';
// import * as ctaBlock from './cta';
// import * as highlight from './highlight';
// import * as iframe from './iframe';
// import * as header from './header';
// import * as mediaRichText from './media_text';

// Test Block
import * as myheader from './myheader';

// import './image/extend';
// import './group/extend';
// import './image_gallery/extend';
// import './list/extend';

import './common/common.scss';

// const { registerBlockType } = blocks;
// const { dispatch, select } = data;
// const { __ } = i18n;

const colBlocks = [
  myheader,
  // accordionBlock,
  // accordionItemBlock,
  // brandingBlock,
  // checklist,
  // ctaBlock,
  // highlight,
  // iframe,
  // header,
  // mediaRichText,
];

// Category name and slug
const category = {
  slug: 'coliquio', // needs to match the css class of the block container: ".wp-block-coliquio-[block-name]"
  title: __('coliquio Blocks'),
};

// Register the new category and blocks
export function registerBlocks () {
  // const currentCategories = select('core/blocks')
  // .getCategories()
  // .filter(item => item.slug !== category.slug);
  // dispatch('core/blocks').setCategories([category, ...currentCategories]);

  colBlocks.forEach(block => {
    registerBlockType(`${category.slug}/${block.name}`, {
      category: category.slug,
      ...block.settings,
    });
  });
}

registerBlocks();
