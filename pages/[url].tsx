import { InferGetServerSidePropsType } from 'next'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import getOriginalUrl from '../lib/getOriginalUrl'

export default function Redirect ({
  originalUrl,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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

export async function getServerSideProps ({ params: { url } }: { params: { url: string }}) {
  try {
    const originalUrl = await getOriginalUrl(url)
    return {
      props: {
        originalUrl,
      },
    }
  } catch (error: any) {
    if (error.description === 'Set not found.') {
      return {
        notFound: true,
      }
    }
    throw new Error(error)
  }
}
