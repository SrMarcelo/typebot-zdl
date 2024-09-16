import { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authZLID: string | undefined = `${req.query.authZLID}`

  const cookieConfig = {
    maxAge: 180 * 24 * 60 * 60,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    domain:
      process.env.NODE_ENV === 'production'
        ? 'fluxos.zelead.com.br'
        : 'localhost',
    path: '/',
  }

  const cookie1 = serialize('authId', authZLID, cookieConfig)

  res
    .setHeader('Set-Cookie', [cookie1])
    .redirect(process.env.NEXTAUTH_URL || '/')
}
