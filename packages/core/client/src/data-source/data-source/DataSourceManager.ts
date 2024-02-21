import type { CollectionOptions, Collection } from '../collection';
import type { Application } from '../../application/Application';

import { type DataSourceOptions, DataSource, LocalDataSource, DataSourceFactory } from './DataSource';
import { type CollectionTemplateFactory, CollectionTemplateManager } from '../collection-template';
import { type CollectionFieldInterfaceFactory, CollectionFieldInterfaceManager } from '../collection-field-interface';

export const DEFAULT_DATA_SOURCE_NAME = 'main';
export const DEFAULT_DATA_SOURCE_TITLE = '{{t("Main")}}';

export interface DataSourceManagerOptions {
  collectionTemplates?: CollectionTemplateFactory[];
  fieldInterfaces?: CollectionFieldInterfaceFactory[];
  fieldInterfaceGroups?: Record<string, { label: string; order?: number }>;
  collectionMixins?: (typeof Collection)[];
  dataSources?: DataSourceOptions[];
  collections?: CollectionOptions[];
}

export class DataSourceManager {
  protected dataSourceInstancesMap: Record<string, DataSource> = {};
  protected multiDataSources: [() => Promise<DataSourceOptions[]>, DataSourceFactory][] = [];
  public collectionMixins: (typeof Collection)[] = [];
  public collectionTemplateManager: CollectionTemplateManager;
  public collectionFieldInterfaceManager: CollectionFieldInterfaceManager;

  constructor(
    protected options: DataSourceManagerOptions = {},
    public app: Application,
  ) {
    this.collectionTemplateManager = new CollectionTemplateManager(options.collectionTemplates, this);
    this.collectionFieldInterfaceManager = new CollectionFieldInterfaceManager(
      options.fieldInterfaces,
      options.fieldInterfaceGroups,
      this,
    );
    this.collectionMixins.push(...(options.collectionMixins || []));

    this.addDataSource(LocalDataSource, {
      key: DEFAULT_DATA_SOURCE_NAME,
      displayName: DEFAULT_DATA_SOURCE_TITLE,
      collections: options.collections || [],
    });
    (options.dataSources || []).forEach((dataSourceOptions) => {
      this.addDataSource(LocalDataSource, dataSourceOptions);
    });
  }

  addCollectionMixins(mixins: (typeof Collection)[] = []) {
    const newMixins = mixins.filter((mixin) => !this.collectionMixins.includes(mixin));
    if (!newMixins.length) return;
    this.collectionMixins.push(...newMixins);

    // Re-add tables
    this.getDataSources().forEach((dataSource) => dataSource.collectionManager.reAddCollections());
  }

  getDataSources() {
    return Object.values(this.dataSourceInstancesMap);
  }

  getDataSource(key?: string) {
    return key ? this.dataSourceInstancesMap[key] : this.dataSourceInstancesMap[DEFAULT_DATA_SOURCE_NAME];
  }

  removeDataSources(keys: string[]) {
    keys.forEach((key) => {
      delete this.dataSourceInstancesMap[key];
    });
  }

  addDataSource(DataSource: DataSourceFactory, options: DataSourceOptions) {
    const dataSourceInstance = new DataSource(options, this);
    this.dataSourceInstancesMap[dataSourceInstance.key] = dataSourceInstance;
    return dataSourceInstance;
  }

  async addDataSources(request: () => Promise<DataSourceOptions[]>, DataSource: DataSourceFactory) {
    if (this.multiDataSources.some(([req, DS]) => req === request && DS === DataSource)) return;
    this.multiDataSources.push([request, DataSource]);
  }

  getAllCollections(
    predicate?: (collection: Collection) => boolean,
  ): (DataSourceOptions & { collections: Collection[] })[] {
    return this.getDataSources().reduce<(DataSourceOptions & { collections: Collection[] })[]>((acc, dataSource) => {
      acc.push({
        ...dataSource.getOptions(),
        collections: dataSource.collectionManager.getCollections(predicate),
      });
      return acc;
    }, []);
  }

  addFieldInterfaceGroups(options: Record<string, { label: string; order?: number }>) {
    this.collectionFieldInterfaceManager.addFieldInterfaceGroups(options);
  }

  addCollectionTemplates(templateClasses: CollectionTemplateFactory[] = []) {
    this.collectionTemplateManager.addCollectionTemplates(templateClasses);
  }

  addFieldInterfaces(fieldInterfaceClasses: CollectionFieldInterfaceFactory[] = []) {
    this.collectionFieldInterfaceManager.addFieldInterfaces(fieldInterfaceClasses);
  }

  async reload() {
    await Promise.all(
      this.multiDataSources.map(async ([request, DataSource]) => {
        const list = await request();
        list.map((options) => this.addDataSource(DataSource, options));
      }),
    );

    return Promise.all(this.getDataSources().map((dataSource) => dataSource.reload()));
  }
}