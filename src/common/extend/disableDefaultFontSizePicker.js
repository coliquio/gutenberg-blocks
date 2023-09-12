import { hooks } from 'wp';

const { addFilter } = hooks;

// Disable default FontSizePicker on the following blocks
const disableOnBlocks = ['core/paragraph'];

/**
 * Set default FontSizePicker to false for block settings.
 *
 * @param {object} settings Current block settings.
 * @param {string} name Name of block.
 *
 * @returns {object} Modified block settings.
 */
const disableDefaultFontSizePicker = (settings, name) => {
  // Do nothing if it's another block than our defined ones.
  if (!disableOnBlocks.includes(name)) {
    return settings;
  }

  settings.supports = {
    ...settings.supports,
    __experimentalFontSize: false,
  };

  return settings;
};

addFilter('blocks.registerBlockType', 'styled-blocks/settings', disableDefaultFontSizePicker);
