// import { CascaderProps } from 'antd';
import _ from 'lodash';
import { DEFAULT_DATA_SOURCE_NAME, type CollectionManagerV2 } from './CollectionManager';
import { CollectionFieldOptionsV2 } from './Collection';
import { useMemo } from 'react';

// 等把老的去掉后，再把这个函数的实现从那边移动过来
// export function getCollectionFieldsOptions(){}

export const isTitleField = (cm: CollectionManagerV2, field: CollectionFieldOptionsV2) => {
  return !field.isForeignKey && cm.getFieldInterface(field.interface)?.titleUsable;
};

export const useDataSourceHeaders = (dataSource?: string) => {
  const headers = useMemo(() => {
    if (dataSource && dataSource !== DEFAULT_DATA_SOURCE_NAME) {
      return { 'x-data-source': dataSource };
      // return { 'x-connection': dataSource };
    }
  }, [dataSource]);

  return headers;
};