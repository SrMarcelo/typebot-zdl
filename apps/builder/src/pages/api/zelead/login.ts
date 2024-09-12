import { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authZLID: string | undefined = `${req.query.authZLID}`
  const authJWT: string | undefined = `${req.query.authJWT}`

  const cookieConfig = {
    maxAge: 180 * 24 * 60 * 60,
    httpOnly: true,
    secure: true,
    domain: `${
      process.env.NEXTAUTH_URL
        ? process.env.NEXTAUTH_URL.replace('https://', '').replace(
            'http://',
            ''
          )
        : ''
    }`,
    path: '/',
  }

  const cookie1 = serialize('authId', authZLID, cookieConfig)
  const cookie2 = serialize('authJWT', authJWT, cookieConfig)

  res
    .setHeader('Set-Cookie', [cookie1, cookie2])
    .redirect(process.env.NEXTAUTH_URL || '/')
}
