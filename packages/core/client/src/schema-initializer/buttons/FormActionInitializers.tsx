import { SchemaInitializerItemType } from '../../application';
import { SchemaInitializer } from '../../application/schema-initializer/SchemaInitializer';

// TODO(refactor): should be moved to workflow plugin
const formTriggerWorkflowActionInitializerV2: SchemaInitializerItemType = {
  name: 'submitToWorkflow',
  title: '{{t("Submit to workflow", { ns: "workflow" })}}',
  Component: 'CustomizeActionInitializer',
  schema: {
    title: '{{t("Submit to workflow", { ns: "workflow" })}}',
    'x-component': 'Action',
    'x-component-props': {
      useProps: '{{ useTriggerWorkflowsActionProps }}',
    },
    'x-toolbar': 'ActionSchemaToolbar',
    'x-settings': 'actionSettings:submitToWorkflow',
    'x-action-settings': {
      assignedValues: {},
      skipValidator: false,
      onSuccess: {
        manualClose: true,
        redirecting: false,
        successMessage: '{{t("Submitted successfully")}}',
      },
      triggerWorkflows: [],
    },
    'x-action': 'customize:triggerWorkflows',
  },
};

// 表单的操作配置
export const formActionInitializers = new SchemaInitializer({
  name: 'FormActionInitializers',
  title: '{{t("Configure actions")}}',
  icon: 'SettingOutlined',
  items: [
    {
      type: 'itemGroup',
      name: 'enableActions',
      title: '{{t("Enable actions")}}',
      children: [
        {
          name: 'submit',
          title: '{{t("Submit")}}',
          Component: 'CreateSubmitActionInitializer',
          schema: {
            'x-action-settings': {},
          },
        },
      ],
    },
    {
      name: 'divider',
      type: 'divider',
    },
    {
      name: 'custom',
      type: 'subMenu',
      title: '{{t("Customize")}}',
      children: [
        {
          name: 'saveRecord',
          title: '{{t("Save record")}}',
          Component: 'SaveRecordActionInitializer',
        },
        formTriggerWorkflowActionInitializerV2,
        {
          name: 'customRequest',
          title: '{{t("Custom request")}}',
          Component: 'CustomRequestInitializer',
        },
      ],
    },
  ],
});

export const createFormActionInitializers = new SchemaInitializer({
  name: 'CreateFormActionInitializers',
  title: '{{t("Configure actions")}}',
  icon: 'SettingOutlined',
  items: [
    {
      type: 'itemGroup',
      title: '{{t("Enable actions")}}',
      name: 'enableActions',
      children: [
        {
          name: 'submit',
          title: '{{t("Submit")}}',
          Component: 'CreateSubmitActionInitializer',
          schema: {
            'x-action-settings': {},
          },
        },
      ],
    },
    {
      name: 'divider',
      type: 'divider',
    },
    {
      type: 'subMenu',
      title: '{{t("Customize")}}',
      name: 'customize',
      children: [
        {
          name: 'saveRecord',
          title: '{{t("Save record")}}',
          Component: 'SaveRecordActionInitializer',
        },
        formTriggerWorkflowActionInitializerV2,
        {
          name: 'customRequest',
          title: '{{t("Custom request")}}',
          Component: 'CustomRequestInitializer',
        },
      ],
    },
  ],
});

export const updateFormActionInitializers = new SchemaInitializer({
  name: 'UpdateFormActionInitializers',
  title: '{{t("Configure actions")}}',
  icon: 'SettingOutlined',
  items: [
    {
      type: 'itemGroup',
      title: '{{t("Enable actions")}}',
      name: 'enableActions',
      children: [
        {
          name: 'submit',
          title: '{{t("Submit")}}',
          Component: 'UpdateSubmitActionInitializer',
          schema: {
            'x-action-settings': {},
          },
        },
      ],
    },
    {
      name: 'divider',
      type: 'divider',
    },
    {
      type: 'subMenu',
      title: '{{t("Customize")}}',
      name: 'customize',
      children: [
        {
          name: 'popup',
          title: '{{t("Popup")}}',
          Component: 'PopupActionInitializer',
          useComponentProps() {
            return {
              'x-component': 'Action',
            };
          },
        },
        {
          name: 'saveRecord',
          title: '{{t("Save record")}}',
          Component: 'SaveRecordActionInitializer',
        },
        formTriggerWorkflowActionInitializerV2,
        {
          type: 'item',
          name: 'customRequest',
          title: '{{t("Custom request")}}',
          Component: 'CustomRequestInitializer',
        },
      ],
    },
  ],
});
