import { query as q } from 'faunadb'

import client from './faunaClient'

export default async function getOrignalUrl (shortUrl: string): Promise<string> {
  const retrieveUrlResponse: {
    ref: string,
    data: {
      count: number,
      original: string,
    }
  } = await client.query(
    q.Get(
      q.Match(q.Index('findURLbyShort'), shortUrl)
    )
  )

  const {
    ref,
    data: {
      count,
      original,
    },
  } = retrieveUrlResponse

  await client.query(
    q.Update(
      q.Ref(ref),
      {
        data: {
          count: count + 1,
        },
      }
    )
  )

  return original
}
