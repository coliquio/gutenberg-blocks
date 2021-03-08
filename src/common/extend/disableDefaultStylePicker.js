import { hooks } from 'wp';

const { addFilter } = hooks;

// Disable defaultStylePicker on the following blocks
const disableOnBlocks = [
  'core/image',
  'core/quote',
  'core/button',
  'core/pullquote',
  'core/separator',
  'core/social-links',
  'core/table',
];

/**
 * Set defaultStylePicker to false for block settings.
 *
 * @param {object} settings Current block settings.
 * @param {string} name Name of block.
 *
 * @returns {object} Modified block settings.
 */
const disableDefaultStylePicker = (settings, name) => {
  // Do nothing if it's another block than our defined ones.
  if (!disableOnBlocks.includes(name)) {
    return settings;
  }

  settings.supports = {
    ...settings.supports,
    defaultStylePicker: false,
  };

  return settings;
};

addFilter(
  'blocks.registerBlockType',
  'styled-blocks/settings',
  disableDefaultStylePicker
);
