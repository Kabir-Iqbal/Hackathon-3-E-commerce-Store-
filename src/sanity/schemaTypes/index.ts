import { type SchemaTypeDefinition } from 'sanity'
import { product } from './products'
import { Category}  from './category'
import { order } from './order'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, Category , order ]
}
