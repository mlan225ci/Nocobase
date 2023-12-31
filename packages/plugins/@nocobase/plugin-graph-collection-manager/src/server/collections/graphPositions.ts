import { defineCollection } from '@nocobase/database';

export default defineCollection({
  dumpRules: 'required',
  name: 'graphPositions',
  fields: [
    {
      type: 'string',
      name: 'collectionName',
      unique: true,
    },
    {
      type: 'double',
      name: 'x',
    },
    {
      type: 'double',
      name: 'y',
    },
  ],
});
