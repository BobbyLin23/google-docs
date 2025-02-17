import type { SQL } from 'drizzle-orm'
import { and, eq, ilike } from 'drizzle-orm'

import { documentsTable } from '~/utils/schema'

interface QueryParams {
  page?: string | number
  pageSize?: string | number
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

    const _page = Math.max(1, Number(query.page) || 1)
    const _pageSize = Math.max(1, Math.min(50, Number(query.pageSize) || 5))

    const offset = (_page - 1) * _pageSize

    const documents = await db
      .select()
      .from(documentsTable)
      .where(and(...filters))
      .limit(_pageSize)
      .offset(offset)

    return {
      data: documents,
      pagination: {
        page: _page,
        pageSize: _pageSize,
        offset,
      },
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
