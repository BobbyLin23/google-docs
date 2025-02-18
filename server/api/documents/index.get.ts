import type { SQL } from 'drizzle-orm'
import { and, eq, ilike } from 'drizzle-orm'

import { documentsTable } from '~/utils/schema'

interface QueryParams {
  count?: string
  search?: string
}

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event) as QueryParams

    const { userId } = event.context.auth
    if (!userId) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      })
    }

    const filters: SQL[] = []
    filters.push(eq(documentsTable.ownerId, userId))

    if (query.search) {
      filters.push(ilike(documentsTable.title, `%${query.search}%`))
    }

    const documents = await db
      .select()
      .from(documentsTable)
      .where(and(...filters))
      .limit(query.count ? Number.parseInt(query.count) : 5)

    return {
      data: documents,
    }
  }
  catch (error) {
    console.error('[Documents Get API Error]:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
