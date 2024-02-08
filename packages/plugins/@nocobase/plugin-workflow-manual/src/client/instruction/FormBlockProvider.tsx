import { createForm } from '@formily/core';
import { RecursionField, useField, useFieldSchema } from '@formily/react';
import {
  BlockRequestContext,
  CollectionManagerProviderV2,
  CollectionProvider,
  DEFAULT_DATA_SOURCE_NAME,
  FormActiveFieldsProvider,
  FormBlockContext,
  FormV2,
  RecordProvider,
  useAPIClient,
  useAssociationNames,
  useBlockRequestContext,
  useDataSourceHeaders,
  useDesignable,
  useRecord,
} from '@nocobase/client';
import React, { useMemo, useRef } from 'react';

export function FormBlockProvider(props) {
  const userJob = useRecord();
  const fieldSchema = useFieldSchema();
  const field = useField();
  const formBlockRef = useRef(null);
  const dataSource = props.dataSource || DEFAULT_DATA_SOURCE_NAME;

  const { getAssociationAppends } = useAssociationNames(dataSource);
  const { appends, updateAssociationValues } = getAssociationAppends();
  const [formKey] = Object.keys(fieldSchema.toJSON().properties ?? {});
  const values = userJob?.result?.[formKey];

  const { findComponent } = useDesignable();
  const Component = findComponent(field.component?.[0]) || React.Fragment;

  const form = useMemo(
    () =>
      createForm({
        initialValues: values,
      }),
    [values],
  );

  const params = useMemo(() => {
    return {
      appends,
      ...props.params,
    };
  }, [appends, props.params]);
  const service = useMemo(() => {
    return {
      loading: false,
      data: {
        data: values,
      },
    };
  }, [values]);
  const api = useAPIClient();
  const headers = useDataSourceHeaders(dataSource);

  const resource = api.resource(props.collection, undefined, headers);
  const __parent = useBlockRequestContext();

  const formBlockValue = useMemo(() => {
    return {
      params,
      form,
      field,
      service,
      updateAssociationValues,
      formBlockRef,
    };
  }, [field, form, params, service, updateAssociationValues]);

  return !userJob.status || values ? (
    <CollectionManagerProviderV2 dataSource={dataSource}>
      <CollectionProvider collection={props.collection}>
        <RecordProvider record={values} parent={null}>
          <FormActiveFieldsProvider name="form">
            <BlockRequestContext.Provider value={{ block: 'form', props, field, service, resource, __parent }}>
              <FormBlockContext.Provider value={formBlockValue}>
                <Component {...field.componentProps}>
                  <FormV2.Templates style={{ marginBottom: 18 }} form={form} />
                  <div ref={formBlockRef}>
                    <RecursionField schema={fieldSchema} onlyRenderProperties />
                  </div>
                </Component>
              </FormBlockContext.Provider>
            </BlockRequestContext.Provider>
          </FormActiveFieldsProvider>
        </RecordProvider>
      </CollectionProvider>
    </CollectionManagerProviderV2>
  ) : null;
}
