import prisma from '~/server/db/prisma'

export default defineEventHandler(async event => {
  const cardId = event.context.params.id as string

  const card = await prisma.todoCard.findUnique({
    where: { id: cardId },
    include: { todoRows: true },
  })

  if (card === null)
    throw createError({ message: `No such card with id: ${cardId}`, statusCode: 400 })

  type MarkdownRow = {
    isCompleted: boolean
    text: string
  }

  const createMarkdown = (
    title: string,
    rows: MarkdownRow[],
    meta?: { createdAt: Date; updatedAt: Date }
  ): string => {
    let md = ''

    if (meta) {
      md += '---\n'
      md += `createdAt: ${meta.createdAt}\n`
      md += `updatedAt: ${meta.updatedAt}\n`
      md += '---\n\n'
    }

    md += `# ${title}\n\n`

    for (const row of rows) {
      const checkbox = row.isCompleted ? '[x]' : '[ ]'
      md += `- ${checkbox} ${row.text}\n`
    }
    return md
  }

  const rowsSortedByOrder = card.todoRows.sort((row1, row2) => row1.order - row2.order)

  const md = createMarkdown(card.title, rowsSortedByOrder, {
    createdAt: card.createdAt,
    updatedAt: card.updatedAt,
  })

  return { filename: `${card.title}.md`, md }
})
