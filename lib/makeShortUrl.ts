import { query as q } from 'faunadb'

import client from './faunaClient'

function generateShortUrlId (): string {
  const availableCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('')
  const length = 6

  let shortId = ''
  for (let i = 0; i < length; i += 1) {
    shortId += availableCharacters[Math.floor(Math.random() * availableCharacters.length)]
  }

  return shortId
}

export default async function makeShortUrlId (originalUrl: string, shortUrl: string|null = null): Promise<{
  error?: Error,
  message?: string,
  ok: boolean,
  statusCode: number,
}> {
  const shortUrlId = shortUrl ?? generateShortUrlId()

  try {
    const make: {
      data: {
        count: number,
        original: string,
        short: string
      }
    } = await client.query(
      q.Create(
        q.Collection('URL'),
        {
          data: {
            count: 0,
            original: originalUrl,
            short: shortUrlId,
          },
        }
      )
    )

    return {
      message: `Generated new short url id for "${make.data.original}" as "${make.data.short}"`,
      ok: true,
      statusCode: 201,
    }
  } catch (error: any) {
    return {
      error,
      ok: false,
      statusCode: error.requestResult.statusCode,
    }
  }
}
