import type { UpdateDocument } from '~/utils/schema'
import { eq } from 'drizzle-orm'
import { documentsTable } from '~/utils/schema'

export default defineEventHandler(async (event) => {
  try {
    const { userId } = event.context.auth

    if (!userId) {
      return createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      })
    }

    const body = await readBody(event) as UpdateDocument

    const { id, title } = body

    if (!id) {
      return createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
      })
    }

    const [document] = await db.select().from(documentsTable).where(
      eq(documentsTable.id, id),
    )

    if (!document) {
      return createError({
        statusCode: 404,
        statusMessage: 'Not Found',
      })
    }

    const isOwner = document.ownerId === userId

    if (!isOwner) {
      return createError({
        statusCode: 403,
        statusMessage: 'Forbidden',
      })
    }

    const [res] = await db.update(documentsTable).set({
      title,
    }).where(
      eq(documentsTable.id, id),
    ).returning()

    return res
  }
  catch (error) {
    console.error(error)
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
