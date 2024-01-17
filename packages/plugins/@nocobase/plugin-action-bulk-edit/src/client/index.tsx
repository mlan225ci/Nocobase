import { Plugin, useCollection } from '@nocobase/client';
import { bulkEditActionSettings, deprecatedBulkEditActionSettings } from './BulkEditAction.Settings';
import { BulkEditFormItemInitializers } from './BulkEditFormItemInitializers';
import { BulkEditPluginProvider } from './BulkEditPluginProvider';
import { CreateFormBulkEditBlockInitializers } from './CreateFormBulkEditBlockInitializers';
export class BulkEditPlugin extends Plugin {
  async load() {
    this.app.use(BulkEditPluginProvider);
    this.app.schemaSettingsManager.add(deprecatedBulkEditActionSettings);
    this.app.schemaSettingsManager.add(bulkEditActionSettings);
    this.app.schemaInitializerManager.add(BulkEditFormItemInitializers);
    this.app.schemaInitializerManager.add(CreateFormBulkEditBlockInitializers);

    const initializerData = {
      type: 'item',
      title: '{{t("Bulk edit")}}',
      name: 'bulkEdit',
      Component: 'CustomizeBulkEditActionInitializer',
      schema: {
        'x-align': 'right',
        'x-decorator': 'ACLActionProvider',
        'x-action': 'customize:bulkEdit',
        'x-toolbar': 'ActionSchemaToolbar',
        'x-settings': 'ActionSettings:bulkEdit',
        'x-acl-action': 'update',
        'x-acl-action-props': {
          skipScopeCheck: true,
        },
      },
      useVisible() {
        const collection = useCollection();
        return (
          (collection.template !== 'view' || collection?.writableView) &&
          collection.template !== 'file' &&
          collection.template !== 'sql'
        );
      },
    };

    const tableActionInitializers = this.app.schemaInitializerManager.get('TableActionInitializers');
    tableActionInitializers?.add('customize.bulkEdit', initializerData);
    this.app.schemaInitializerManager.addItem('GanttActionInitializers', 'customize.bulkEdit', initializerData);
    this.app.schemaInitializerManager.addItem('MapActionInitializers', 'customize.bulkEdit', initializerData);
  }
}

export default BulkEditPlugin;
