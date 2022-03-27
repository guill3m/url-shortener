import { query as q } from 'faunadb'

import client from 'lib/faunaClient'

function generateShortUrlId () {
  const availableCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('')
  const length = 6

  let shortId = ''
  for (let i = 0; i < length; i += 1) {
    shortId += availableCharacters[Math.floor(Math.random() * availableCharacters.length)]
  }

  return shortId
}

async function makeShortUrlId (originalUrl, shortUrl = null) {
  const shortUrlId = shortUrl ?? generateShortUrlId()

  try {
    const make = await client.query(
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
      ok: true,
      message: `Generated new short url id for "${originalUrl}" as "${make.data.short}"`,
    }
  } catch (error) {
    return {
      ok: false,
      error,
    }
  }
}

export default makeShortUrlId
