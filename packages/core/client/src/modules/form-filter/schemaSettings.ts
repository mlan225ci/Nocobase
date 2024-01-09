import { useFieldSchema } from '@formily/react';
import { useTranslation } from 'react-i18next';
import { SchemaSettings } from '../../application/schema-settings/SchemaSettings';
import { useCollection } from '../../collection-manager';
import { FilterBlockType } from '../../filter-provider';
import {
  SchemaSettingsBlockTitleItem,
  SchemaSettingsConnectDataBlocks,
  SchemaSettingsFormItemTemplate,
  SchemaSettingsLinkageRules,
} from '../../schema-settings';

export const filterFormBlockSettings = new SchemaSettings({
  name: 'filterFormBlockSettings',
  items: [
    {
      name: 'title',
      Component: SchemaSettingsBlockTitleItem,
    },
    {
      name: 'formItemTemplate',
      Component: SchemaSettingsFormItemTemplate,
      useComponentProps() {
        const { name } = useCollection();
        const fieldSchema = useFieldSchema();
        const defaultResource = fieldSchema?.['x-decorator-props']?.resource;
        return {
          componentName: 'FilterFormItem',
          collectionName: name,
          resourceName: defaultResource,
        };
      },
    },
    {
      name: 'linkageRules',
      Component: SchemaSettingsLinkageRules,
      useComponentProps() {
        const { name } = useCollection();
        return {
          collectionName: name,
        };
      },
    },
    {
      name: 'connectDataBlocks',
      Component: SchemaSettingsConnectDataBlocks,
      useComponentProps() {
        const { t } = useTranslation();
        return {
          type: FilterBlockType.FORM,
          emptyDescription: t('No blocks to connect'),
        };
      },
    },
    {
      name: 'divider',
      type: 'divider',
    },
    {
      name: 'remove',
      type: 'remove',
      componentProps: {
        removeParentsIfNoChildren: true,
        breakRemoveOn: {
          'x-component': 'Grid',
        },
      },
    },
  ],
});