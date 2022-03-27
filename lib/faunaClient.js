import { Client } from 'faunadb'

const client = new Client({
  domain: process.env.FAUNA_DOMAIN,
  secret: process.env.FAUNA_SECRET,
  scheme: 'https',
})

export default client
