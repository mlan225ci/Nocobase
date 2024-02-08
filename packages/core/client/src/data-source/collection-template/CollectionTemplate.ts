import type { CollectionOptionsV2, CollectionV2 } from '../collection';
import type { ISchema } from '@formily/react';
import type { CollectionTemplateManagerV2 } from './CollectionTemplateManager';
import type { Application } from '../../application/Application';

interface AvailableFieldInterfacesInclude {
  include?: any[];
}

interface AvailableFieldInterfacesExclude {
  exclude?: any[];
}

interface CollectionTemplateDefaultOptions {
  /**
   * 自动生成 id
   * @default true
   * */
  autoGenId?: boolean;
  /** 创建人 */
  createdBy?: boolean;
  /** 最后更新人 */
  updatedBy?: boolean;
  /** 创建日期 */
  createdAt?: boolean;
  /** 更新日期 */
  updatedAt?: boolean;
  /** 可排序 */
  sortable?: boolean;
  /* 树结构 */
  tree?: string;
  /* 日志 */
  logging?: boolean;
  /** 继承 */
  inherits?: string | string[];
  /* 字段列表 */
  fields?: CollectionOptionsV2['fields'];
  [key: string]: any;
}

export type CollectionTemplateFactory = new (
  collectionTemplateManager: CollectionTemplateManagerV2,
) => CollectionTemplate;
export abstract class CollectionTemplate {
  constructor(public collectionTemplateManager: CollectionTemplateManagerV2) {}
  name: string;
  Collection?: typeof CollectionV2;
  title?: string;
  color?: string;
  /** 排序 */
  order?: number;
  /** 默认配置 */
  default?: CollectionTemplateDefaultOptions;
  events?: any;
  /** UI 可配置的 CollectionOptions 参数（添加或编辑的 Collection 表单的字段） */
  configurableProperties?: Record<string, ISchema>;
  /** 当前模板可用的字段类型 */
  availableFieldInterfaces?: AvailableFieldInterfacesInclude | AvailableFieldInterfacesExclude;
  /** 是否分割线 */
  divider?: boolean;
  /** 模板描述 */
  description?: string;
  /**配置字段中的操作按钮 */
  configureActions?: Record<string, ISchema>;
  //是否禁止删除字段
  forbidDeletion?: boolean;

  supportDataSourceType?: string[];
  notSupportDataSourceType?: string[];

  transform?(collection: CollectionOptionsV2, app: Application): CollectionOptionsV2;
}