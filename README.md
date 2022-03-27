# URL shortener

A very basic URL shortener using [Next.js](https://nextjs.org/) and a [Fauna](https://fauna.com/) database.

**Nothing fancy:** It generates a short url with the given ID (or with a random 6 character one if you don’t provide one) and counts how many times that short URL has been called (no functionality to check this is provided, needs to be checked in the Fauna dashboard). With basic login.

## Development

Copy the contents of `.env.local.example` to `.env.local`, and fill in your values.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production

Generate a production build:

```bash
npm run build
```

And run it:

```bash
npm run start
```
