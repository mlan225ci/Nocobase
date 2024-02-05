// import { CascaderProps } from 'antd';
import _ from 'lodash';
import { useMemo } from 'react';
import { CollectionFieldOptionsV2 } from './collection';
import { DEFAULT_DATA_SOURCE_NAME, DataSourceManagerV2 } from './data-source';

// 等把老的去掉后，再把这个函数的实现从那边移动过来
// export function getCollectionFieldsOptions(){}

export const isTitleFieldV2 = (dm: DataSourceManagerV2, field: CollectionFieldOptionsV2) => {
  return !field.isForeignKey && dm.collectionFieldInterfaceManager.getFieldInterface(field.interface)?.titleUsable;
};

export const useDataSourceHeadersV2 = (dataSource?: string) => {
  const headers = useMemo(() => {
    if (dataSource && dataSource !== DEFAULT_DATA_SOURCE_NAME) {
      return { 'x-data-source': dataSource };
      // return { 'x-connection': dataSource };
    }
  }, [dataSource]);

  return headers;
};
