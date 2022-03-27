import React, { useEffect } from 'react'

import getOriginalUrl from 'lib/getOriginalUrl'
import { useRouter } from 'next/router'

export default function Redirect ({
  originalUrl,
}) {
  const router = useRouter()

  useEffect(() => {
    router.push(originalUrl)
  }, [originalUrl, router])

  return (
    <>
      <main>
        <p>Redirecting to <a href={originalUrl}>{originalUrl}</a>...</p>
      </main>
    </>
  )
}

export async function getServerSideProps ({ params: { url } }) {
  try {
    const originalUrl = await getOriginalUrl(url)
    return {
      props: {
        originalUrl,
      },
    }
  } catch (error) {
    if (error.description === 'Set not found.') {
      return {
        notFound: true,
      }
    }
    throw new Error(error)
  }
}
