import React from 'react'
import { HStack, Flex, useDisclosure, Text } from '@chakra-ui/react'
import { HardDriveIcon } from '@/components/icons'
import { useUser } from '@/features/account/hooks/useUser'
import Link from 'next/link'
import { EmojiOrImageIcon } from '@/components/EmojiOrImageIcon'
import { useTranslate } from '@tolgee/react'
import { useWorkspace } from '@/features/workspace/WorkspaceProvider'
import { WorkspaceSettingsModal } from '@/features/workspace/components/WorkspaceSettingsModal'
import { ParentModalProvider } from '@/features/graph/providers/ParentModalProvider'
import { useRouter } from 'next/router'

export const DashboardHeader = () => {
  const { t } = useTranslate()
  const { user } = useUser()
  const { workspace } = useWorkspace()
  const { asPath } = useRouter()

  const isRedirectFromCredentialsCreation = asPath.includes('credentials')

  const { isOpen, onClose } = useDisclosure({
    defaultIsOpen: isRedirectFromCredentialsCreation,
  })

  return (
    <Flex w="full" borderBottomWidth="1px" justify="center">
      <Flex
        justify="space-between"
        alignItems="center"
        h="16"
        maxW="1000px"
        flex="1"
      >
        <Link href="/typebots" data-testid="typebot-logo">
          <EmojiOrImageIcon
            boxSize="70px"
            icon={`${process.env.NEXTAUTH_URL}/lead.svg`}
            defaultIcon={HardDriveIcon}
          />
        </Link>
        <HStack>
          {user && workspace && !workspace.isPastDue && (
            <ParentModalProvider>
              <WorkspaceSettingsModal
                isOpen={isOpen}
                onClose={onClose}
                user={user}
                workspace={workspace}
                defaultTab={
                  isRedirectFromCredentialsCreation ? 'credentials' : undefined
                }
              />
            </ParentModalProvider>
          )}
          <Text fontSize="large" color="white" fontWeight="bold">
            {workspace?.name ?? t('dashboard.title')}
          </Text>
        </HStack>
      </Flex>
    </Flex>
  )
}
