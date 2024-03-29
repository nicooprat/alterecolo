import type { Handler } from '@netlify/functions'
import Airtable from 'airtable'
import type { Item, Category } from '../../src/composables/data'

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID as string,
)

const slugify = (str: string, separator = '-') => {
  return str
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, separator)
}

const handler: Handler = async () => {
  const items: Item[] = []
  const categories: Category[] = []

  try {
    await base('Alternatives')
      .select({
        filterByFormula: '{Validé} = 1', // Only manually validated items
      })
      .eachPage((data, fetchNextPage) => {
        // Load items in component
        items.push(
          ...data.map((item) => {
            const newItem: Item = {
              title: item.fields['Alternative'],
              replaced: item.fields['Remplacé'],
              desc: item.fields['Description'],
              id: item.id,
              link: item.fields['Lien'],
              difficulty: item.fields['Difficulté'],
              slug: slugify(item.fields['Alternative']),
              createdTime: item._rawJson.createdTime,
              cover: item.fields.Photo && item.fields.Photo[0], // Easier access
              categories: [],
            }

            // Push item categories
            item.fields['Catégorie'].forEach((category: Category['name']) => {
              const slug = slugify(category)
              const existingCategory = categories.find((c) => c.slug === slug)
              // Push normalized categories in newItem
              const cat: Category = {
                name: category,
                count: 1,
                slug,
              }
              newItem.categories.push(cat)
              // Reduce global categories
              if (!existingCategory) {
                categories.push(cat)
              } else {
                existingCategory.count = existingCategory.count + 1
              }
            })
            // Push item itself
            return newItem
          }),
        )
        // Load all data
        fetchNextPage()
      })

    return {
      body: JSON.stringify({
        items,
        categories,
      }),
      statusCode: 200,
      headers: {
        charset: 'utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
