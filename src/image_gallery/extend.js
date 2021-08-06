import React from "react";
import assign from "lodash.assign";
import get from "lodash.get";
import assignWith from "lodash.assignwith";
import "./style.scss";

const { createHigherOrderComponent } = wp.compose;
const { InspectorControls } = wp.blockEditor;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;
const { PanelBody, TextControl, Disabled } = wp.components;
const { useSelect } = wp.data;
const { __ } = wp.i18n;

// Enable properties on the following blocks
const enableOnBlocks = ["core/gallery"];

const disabledElements = [
  {
    text: "Images size",
    selector: ".components-base-control__label",
  },
];

/**
 * Add src attribute to block.
 *
 * @param {object} settings Current block settings.
 * @param {string} name Name of block.
 *
 * @returns {object} Modified block settings.
 */
const addSrcControlAttribute = (settings, name) => {
  // Do nothing if it's another block than our defined ones.
  if (!enableOnBlocks.includes(name)) {
    return settings;
  }

  console.log("blocks.registerBlockType");

  // Use Lodash's assign to gracefully handle if attributes are undefined
  settings.attributes = assign(settings.attributes, {
    caption: {
      type: "string",
      default: "",
    },
    images: {
      type: "array",
      default: [],
    },
  });

  return settings;
};

addFilter(
  "blocks.registerBlockType",
  "extend-block-group/attribute/column-layout",
  addSrcControlAttribute
);

/**
 * Create HOC to add src attribute to block.
 */
const withCustomFeatures = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    // Do nothing if it's another block than our defined ones.
    if (!enableOnBlocks.includes(props.name)) {
      return <BlockEdit {...props} />;
    }

    setTimeout(function () {
      console.log("disable");
      disabledElements.forEach((el) => {
        console.log(el.selector);
        const temp = document.querySelectorAll(el.selector);
        console.log(temp);
        temp.forEach((node) => {
          if (
            el.text === node.innerText &&
            !node.parentNode.parentNode.className.includes("custom-hidden")
          ) {
            node.parentNode.parentNode.className += " custom-hidden";
          }
        });
      });
    }, 50);

    if (props.attributes.images && props.attributes.images.length) {
      let images = useSelect(
        (select) => {
          const { getMedia } = select("core");
          return props.attributes.images
            ? props.attributes.images.map((i) => getMedia(i.id))
            : null;
        },
        [props.attributes.images, props.attributes.images.map((i) => i.id)]
      );

      let imagesReal = images.map((image, i) => {
        let storage = {};

        if (image) {
          if (typeof image.caption === "object") {
            storage.caption = image.caption.raw ? image.caption.raw : undefined;
          }

          storage.copyright = get(
            images,
            "[" + i + "].media_fields.field_copyright.value.value",
            ""
          );

          const mediaDetails = get(images, "[" + i + "].media_details");

          if (mediaDetails) {
            storage.url = get(mediaDetails, "crops.teaser.cdn_url");
            storage.alt = get(
              image,
              "media_fields.field_media_image.value.alt"
            );
            storage.cdnFileId = mediaDetails.cdn_file_id;
            storage.width = undefined;
            storage.height = undefined;
            storage.sizeSlug = undefined;
            storage.crop = null;
            storage.link = undefined;
            storage.aspectRatio = get(
              mediaDetails,
              "crops.teaser.aspect_ratio"
            );
            storage.zoomImage = {
              url: mediaDetails.cdn_url,
              aspectRatio: {
                width: mediaDetails.width,
                height: mediaDetails.height,
              },
            };
          }
          return storage;
        }
      });

      function customizer(objValue, srcValue) {
        return _.isUndefined(srcValue) ? objValue : srcValue;
      }
      assignWith(props.attributes.images, imagesReal, customizer);
    }

    return (
      <Fragment>
        <BlockEdit {...props} />

        <InspectorControls>
          <PanelBody title={__("Copyright Info")} initialOpen={true}>
            {props.attributes.images.map((item, index) => (
              <Disabled>
                <TextControl
                  key={index}
                  label={__("Copyright id" + item ? item.id : "")}
                  help={__("can be changed in media library")}
                  value={item.copyright}
                />
              </Disabled>
            ))}
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  };
}, "withCustomFeatures");

addFilter(
  "editor.BlockEdit",
  "extend-block-gallery/with-custom-features",
  withCustomFeatures
);

/**
 * Add margin style attribute to save element of block.
 *
 * @param {object} saveElementProps Props of save element.
 * @param {Object} blockType Block type information.
 * @param {Object} attributes Attributes of block.
 *
 * @returns {object} Modified props of save element.
 */
const addExtraProps = (saveElementProps, blockType, attributes) => {
  if (!enableOnBlocks.includes(blockType.name)) {
    return saveElementProps;
  }
  wp.blocks.unregisterBlockStyle("core/image", "rounded");
  wp.blocks.unregisterBlockStyle("core/image", "default");

  // saveElementProps.className += attributes.classNameZoom ? attributes.classNameZoom : '';

  return saveElementProps;
};

addFilter(
  "blocks.getSaveContent.extraProps",
  "extend-block-image/get-save-content/extra-props",
  addExtraProps
);
