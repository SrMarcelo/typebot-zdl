import { DevTools, Tolgee } from '@tolgee/react'
import { FormatIcu } from '@tolgee/format-icu'
import ptBR from '../i18n/pt-BR.json'
import { env } from '@typebot.io/env'

export const tolgee = Tolgee()
  .use(DevTools())
  .use(FormatIcu())
  .init({
    apiKey: env.NEXT_PUBLIC_TOLGEE_API_KEY,
    apiUrl: env.NEXT_PUBLIC_TOLGEE_API_URL,
    defaultLanguage: 'pt-BR',
    availableLanguages: ['pt-BR'],
    fallbackLanguage: 'pt-BR',
    staticData: {
      'pt-BR': ptBR,
    },
  })
