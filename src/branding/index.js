import React from 'react';
import { get, isEmpty } from 'lodash';
import { blockEditor, components, compose, i18n, hooks } from 'wp';

import { client } from '../../graphql/client';
import TAXONOMY_TERM_BY_ID_INFOCENTERS from '../../graphql/queries/taxonomyTermByIdInfocenters';

import './style.scss';

const { __ } = i18n;
const { TextControl } = components;
const { InnerBlocks } = blockEditor;
const { createHigherOrderComponent } = compose;

export const name = 'branding-box';

let updateMedia;
let infocenter = document.getElementById('edit-field-infocenters');
let infocentersValue = get(infocenter, 'value');
const brandingBoxImage = document.getElementsByClassName('test-to-select');

// TODO remove before merging - just to test for local development
// name: local drupal taxonomy term ids
// value: coliquio.integration taxonomy term id, just some examples
const mockData = [
  {
    name: '268206924',
    value: '223299267',
  },
  { name: '268206925', value: '162723139' },
  { name: '268206926', value: '772294' },
];

document.addEventListener('change', function () {
  infocenter = document.getElementById('edit-field-infocenters');
  infocentersValue = get(infocenter, 'value');

  if (infocentersValue) {
    // TODO remove before merging - just to test for local development
    // and use the infocentersValue (taxonomy term id of drupal - coliquio integration )
    // infocentersValue = get(infocenter, 'value');
    const infoID = mockData.find(x => x.name === infocentersValue).value;
    getTaxonomyNamebyID(infoID);
  }
});

const getTaxonomyNamebyID = async infoID => {
  const variables = {
    id: infoID,
  };

  const graphQLData = await client.request(
    TAXONOMY_TERM_BY_ID_INFOCENTERS,
    variables
  );
  const {
    taxonomyTermById: { fieldDetailLogo: { uri } = {} } = {},
  } = graphQLData;
  updateMedia(uri);
};

if (!isEmpty(brandingBoxImage)) {
  // TODO remove before merging - just to test for local development
  // and use the infocentersValue (taxonomy term id of drupal - coliquio integration )
  // infocentersValue = get(infocenter, 'value');
  console.log('brandingBoxImage', brandingBoxImage);
  const infoID = mockData.find(
    x => x.name === infocentersValue || x.name !== '_none'
  ).value;
  getTaxonomyNamebyID(infoID);
}

const TEMPLATE = [
  [
    'core/image',
    {
      displayCopyright: false,
      className: 'test-to-select',
      displayCaption: false,
      branding: true,
    },
  ],
];

export const settings = {
  title: __('Branding Box'),

  description: __('Visual wrapper with different styles'),

  icon: 'tickets-alt',

  attributes: {
    title: {
      type: 'string',
      default: 'Dieser Beitrag wird Ihnen präsentiert von',
    },
  },

  edit ({ attributes, className, setAttributes }) {
    const { title } = attributes;

    return (
      <div className={className}>
        <TextControl
          value={title || ''}
          // eslint-disable-next-line no-shadow
          onChange={title => setAttributes({ title })}
        />
        <InnerBlocks template={TEMPLATE} templateLock="all" />
      </div>
    );
  },

  save ({ attributes, className }) {
    const { title } = attributes;

    return (
      <div className={className}>
        <div className="branding-box-outer-wrapper">
          <aside className="branding-box-inner-wrapper">
            {title && <span className="branding-title">{title}</span>}
            <InnerBlocks.Content />
          </aside>
        </div>
      </div>
    );
  },
};

const updateDefaultImageForBrandingBox = createHigherOrderComponent(
  BlockEdit => {
    return props => {
      // Do nothing if it's not a Branding Box Image
      if (!props.attributes.branding) {
        return <BlockEdit {...props} />;
      }

      updateMedia = logouri => {
        props.setAttributes({
          url: logouri,
        });
      };

      return <BlockEdit {...props} />;
    };
  },
  'updateDefaultImageForBrandingBox'
);

hooks.addFilter(
  'editor.BlockEdit',
  'branding-box-image/default-infocenter-logo',
  updateDefaultImageForBrandingBox
);
