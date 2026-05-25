import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { apiVersion, dataset, projectId } from './lib/sanity/env';
import { SINGLETON_TYPES, schemaTypes } from './sanity/schemas';
import { structure } from './sanity/structure';

const singletons: readonly string[] = SINGLETON_TYPES;

export default defineConfig({
  name: 'default',
  title: "Fightin' Tenth",
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletons.includes(schemaType)),
  },
  document: {
    actions: (input, { schemaType }) =>
      singletons.includes(schemaType)
        ? input.filter(({ action }) => action && !['duplicate', 'delete', 'unpublish'].includes(action))
        : input,
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global'
        ? prev.filter(({ templateId }) => !singletons.includes(templateId))
        : prev,
  },
});
