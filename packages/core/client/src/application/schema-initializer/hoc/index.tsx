import React from 'react';
import { ComponentType, useCallback } from 'react';
import { useDesignable } from '../../../schema-component';
import { SchemaInitializerOptions } from '../types';
import { ISchema, observer } from '@formily/react';
import { SchemaInitializerV2Context } from '../hooks';

const defaultWrap = (s: ISchema) => s;

export function withInitializer(C: ComponentType<SchemaInitializerOptions>) {
  const WithInitializer = observer((props: SchemaInitializerOptions) => {
    const { designable, insertAdjacent } = useDesignable();
    const { insert, wrap = defaultWrap, insertPosition = 'beforeEnd', onSuccess, designable: propsDesignable } = props;

    // designable 为 false 时，不渲染
    if (!designable && propsDesignable !== true) {
      return null;
    }

    // 插入 schema 的能力
    const insertSchema = useCallback(
      (schema) => {
        if (insert) {
          insert(wrap(schema));
        } else {
          insertAdjacent(insertPosition, wrap(schema), { onSuccess });
        }
      },
      [insert, wrap, insertAdjacent, insertPosition, onSuccess],
    );

    return (
      <SchemaInitializerV2Context.Provider value={{ insert: insertSchema }}>
        <C {...props} />
      </SchemaInitializerV2Context.Provider>
    );
  });

  WithInitializer.displayName = `WithInitializer(${C.displayName || C.name})`;
  return WithInitializer;
}
