import type { InsertDocument } from '~/utils/schema'
import { documentsTable } from '~/utils/schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event) as InsertDocument

    const { userId, orgId } = event.context.auth

    if (!userId) {
      return createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      })
    }

    const [document] = await db.insert(documentsTable).values({
      title: body.title ?? 'Untitled Document',
      ownerId: userId,
      initialContent: body.initialContent,
      organizationId: orgId,
    }).returning()

    return document
  }
  catch (error) {
    console.error(error)
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
