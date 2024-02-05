import { CollectionFieldInterface } from '../../application/data-source/collection-field-interface/CollectionFieldInterface';
import { defaultProps, operators } from './properties';
import { IField } from './types';

export const color: IField = {
  name: 'color',
  type: 'object',
  group: 'basic',
  order: 10,
  title: '{{t("Color")}}',
  default: {
    type: 'string',
    uiSchema: {
      type: 'string',
      'x-component': 'ColorPicker',
      default: '#1677FF',
    },
  },
  availableTypes: ['string'],
  hasDefaultValue: true,
  properties: {
    ...defaultProps,
  },
  filterable: {
    operators: operators.string,
  },
};

export class ColorFieldInterface extends CollectionFieldInterface {
  name = 'color';
  type = 'object';
  group = 'basic';
  order = 10;
  title = '{{t("Color")}}';
  default = {
    type: 'string',
    uiSchema: {
      type: 'string',
      'x-component': 'ColorPicker',
      default: '#1677FF',
    },
  };
  availableTypes = ['string'];
  hasDefaultValue = true;
  properties = {
    ...defaultProps,
  };
  filterable = {
    operators: operators.string,
  };
}
