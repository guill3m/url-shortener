import { query as q } from 'faunadb'

import client from 'lib/faunaClient'

export default async function getOrignalUrl (shortUrl) {
  const retrieveUrlResponse = await client.query(
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
