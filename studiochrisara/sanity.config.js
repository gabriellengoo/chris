import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { muxInput } from 'sanity-plugin-mux-input';

export default defineConfig({
  name: 'default',
  title: 'studiochrisara',

  projectId: 'rxcle18h', 
  dataset: 'production',

  plugins: [structureTool(), visionTool(),  muxInput()],

  schema: {
    types: schemaTypes,
  },
})
