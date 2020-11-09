import React from 'react'
import assign from 'lodash.assign';

const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;
const { InspectorControls } = wp.editor;
const { PanelBody, SelectControl, TextControl } = wp.components;
const { unregisterBlockStyle } = wp.blocks;

// src in custom block has to be called url now
// url used for link should be href - as it's taken by src
//  

// registerBlockStyle( 'core/image' , {
//     name: 'default',
//     label: __( 'Default' ),
//     isDefault: true,
//   });

unregisterBlockStyle('core/image', 'rounded');

unregisterBlockStyle( 'core/quote', 'large' );


// Enable properties on the following blocks
const enableOnBlocks = [
	'core/image',
];

const spacingControlOptions = [
	{
		label: __( 'None' ),
		value: '',
    },
    {
		label: __( 'XS' ),
		value: 'x-small',
	},
	{
		label: __( 'S' ),
		value: 'small',
	},
	{
		label: __( 'M' ),
		value: 'medium',
	},
	{
		label: __( 'L' ),
		value: 'large',
    },
    {
		label: __( 'XL' ),
		value: 'x-large',
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
const addSrcControlAttribute = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableOnBlocks.includes( name ) ) {
		return settings;
    }
    // debugger;
	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		src: {
			type: 'string',
			default: '',
		},
		classNameTest: {
			type: 'string',
			default: '',
        },
        url: {
            type: 'string',
            default: '',
        },
        href: {
            type: 'string',
            default: '',
        },
        alt: {
            type: 'string',
            default: '',
        },
        height: {
            type: 'number',
            default: undefined,
        },
        width: {
            type: 'number',
            default: undefined,
        },
        spacing: {
			type: 'string',
			default: spacingControlOptions[ 0 ].value,
        },
        copyright: {
            type: 'string',
        },
	} );

	return settings;
};

addFilter( 'blocks.registerBlockType', 'extend-block-image/attribute/src', addSrcControlAttribute );


/**
 * Create HOC to add src attribute to block.
 */
const withSrcAttribute = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		// Do nothing if it's another block than our defined ones.
		if ( ! enableOnBlocks.includes( props.name ) ) {
			return (
				<BlockEdit { ...props } />
			);
        }
        // debugger;

        const { spacing, copyright } = props.attributes;

		// add has-spacing-xy class to block
		if ( spacing ) {
			props.attributes.className = `coliquio-size-${ spacing }`;
        }

        function isHtmlTag(text) {
            let isTag = false;
            if (/^ *(a)(:|::|,|\.|#)[:$#{}()\w\-\[\]='",\.# ]*$/.test(text)) {
                isTag = true;
            }
            return isTag;
          }
        
		return (
			<Fragment>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody
						title={ __( 'Sizing Control' ) }
						initialOpen={ true }
					>
                        <TextControl
                            label={__('Copyright')}
                            value={copyright}
                            onChange={copyright => props.setAttributes({ copyright })}
                        />
						<SelectControl
							label={ __( 'Sizing' ) }
							value={ spacing }
							options={ spacingControlOptions }
							onChange={ ( selectedSpacingOption ) => {
								props.setAttributes( {
									spacing: selectedSpacingOption,
								} );
							} }
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'withSrcAttribute' );

addFilter( 'editor.BlockEdit', 'extend-block-src/with-src-attribute', withSrcAttribute );


/**
 * Add margin style attribute to save element of block.
 *
 * @param {object} saveElementProps Props of save element.
 * @param {Object} blockType Block type information.
 * @param {Object} attributes Attributes of block.
 *
 * @returns {object} Modified props of save element.
 */
const addSpacingExtraProps = ( saveElementProps, blockType, attributes ) => {
    // Do nothing if it's another block than our defined ones.
    if ( ! enableOnBlocks.includes( blockType.name ) ) {
        return saveElementProps;
    }
    // console.log(attributes);

    if ( attributes.copyright ) {
        saveElementProps.children.props.children.push(
            React.createElement(
                "span", // type
                { type: "text" }, // props
                attributes.copyright // children
              )
        );
    }

    // if ( true ) {
    //     // Use Lodash's assign to gracefully handle if attributes are undefined
    //     assign( saveElementProps, { style: { 'margin-bottom': margins.large } } );
    // }
    // console.log(saveElementProps);
    return saveElementProps;
};

addFilter( 'blocks.getSaveContent.extraProps', 'extend-block-example/get-save-content/extra-props', addSpacingExtraProps );