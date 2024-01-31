import React from 'react';
import { useCollection, GeneralSchemaDesigner, useSchemaTemplate } from '@nocobase/client';

export const KanbanDesigner = () => {
  const { name, title } = useCollection();
  const template = useSchemaTemplate();

  return (
    <GeneralSchemaDesigner
      schemaSettings="blockSettings:kanban"
      template={template}
      title={title || name}
    ></GeneralSchemaDesigner>
  );
};
