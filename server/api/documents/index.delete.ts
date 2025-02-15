import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { documentsTable } from '~/utils/schema'

const deleteDocumentSchema = z.object({
  id: z.string(),
})

export default defineEventHandler(async (event) => {
  try {
    const { userId } = event.context.auth

    if (!userId) {
      return createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      })
    }

    const { data, error } = await readValidatedBody(event, body => deleteDocumentSchema.safeParse(body))

    if (error) {
      return createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
      })
    }

    const { id } = data

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

    const [res] = await db.delete(documentsTable).where(
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
