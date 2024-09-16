import { PrismaClient, WorkspaceRole, Plan } from '@typebot.io/prisma'
import { createId } from '@paralleldrive/cuid2'
import { generateId } from '@typebot.io/lib'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const newUser = async (prisma: PrismaClient, data: any) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
    select: {
      id: true,
      apiTokens: {
        select: {
          token: true,
        },
      },
      workspaces: {
        select: {
          workspace: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  })

  if (user) return { user, token: user.apiTokens[0].token }

  const newUser = {
    id: createId(),
    email: data.email as string,
  }

  const token = generateId(24)

  const createdUser = await prisma.user.create({
    data: {
      ...data,
      id: newUser.id,
      apiTokens: {
        create: { name: 'Default', token },
      },
      workspaces: {
        create: {
          role: WorkspaceRole.ADMIN,
          workspace: {
            create: {
              name: data.company ? `${data.company} - Zé do Lead` : 'Workspace',
              plan: Plan.UNLIMITED,
            },
          },
        },
      },
      onboardingCategories: [],
    },
  })

  return { user: createdUser, token }
}
