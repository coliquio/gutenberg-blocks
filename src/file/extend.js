import assign from 'lodash.assign';
import { hooks } from 'wp';
import './style.scss';

const { addFilter } = hooks;

// Enable properties on the following blocks
const enableOnBlocks = ['core/file'];

/**
 * Add extra attributes to block.
 *
 * @param {object} settings Current block settings.
 * @param {string} name Name of block.
 *
 * @returns {object} Modified block settings.
 */
const addExtraAttributes = (settings, name) => {
  // Do nothing if it's another block than our defined ones.
  if (!enableOnBlocks.includes(name)) {
    return settings;
  }

  settings.attributes = assign(settings.attributes, {
    textLinkTarget: {
      type: 'string',
      default: '',
    },
  });

  return settings;
};

addFilter(
  'blocks.registerBlockType',
  'extend-block-file/attribute/extra-attributes',
  addExtraAttributes,
  'blocks.getSaveContent.extraProps',
  'extend-block-image/get-save-content/extra-props-styles',
);
