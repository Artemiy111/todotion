import prisma from '~/server/db/prisma'

export default defineEventHandler(async (event): Promise<{ filename: string; md: string }> => {
  const cardId = event.context.params.id as string

  try {
    const card = await prisma.todoCard.findUniqueOrThrow({
      where: { id: cardId },
      include: { todoRows: true },
    })

    type MarkdownRow = {
      isCompleted: boolean
      text: string
    }

    type Meta = { createdAt: Date; updatedAt: Date }

    const createMarkdown = (title: string, rows: MarkdownRow[], meta?: Meta): string => {
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
  } catch (e) {
    throw createError({ message: `Could not return markdown for card with id: ${cardId}` })
  }
})
