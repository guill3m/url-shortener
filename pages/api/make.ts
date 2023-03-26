import type { NextApiRequest, NextApiResponse } from 'next'

import makeShortUrlId from '../../lib/makeShortUrl'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: {
      original,
      short = null,
    },
    method,
  } = req

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ error: `Method ${method} Not Allowed` })
    return
  }

  try {
    const response = await makeShortUrlId(original, short)

    if (response.ok) {
      res.status(response.statusCode).json({ message: response.message })
      return
    } else {
      res.status(response.statusCode).json({ error: response.error })
      return
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}
