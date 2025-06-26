This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

This is a `NextJs` application using `Typescript`. 
> Next.js is a React framework that simplifies building web applications by providing a structured environment with features like server-side rendering, static site generation, and optimized performance. It builds upon React, offering a more streamlined development experience with built-in tools for routing, data fetching, and more

Find out more about it here: https://nextjs.org/

#### Setup
Install all the dependencies with:
```
bun install
```

And make sure that you've created a `.env` file in package root and updated the `GOOGLE_GENERATIVE_AI_API_KEY` value with your own key. You can get your own from here: https://aistudio.google.com/apikey

For the purpose of this template, we will use `Google`'s LLMs and `AI SDK` https://ai-sdk.dev/ for simplicity but feel free to change it to whatever you want. 

#### Running 
You can run the development server by using `bun`:

```bash
bun dev
```

> Bun is a fast, all-in-one JavaScript runtime and toolkit that offers native, out-of-the-box support for TypeScript. This means that you can develop, test, run, and bundle TypeScript projects directly with Bun without needing additional configuration or tools like a separate TypeScript compiler.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

### Package Management
- `bun`: https://bun.sh/

## Type Safety
- `zod`: https://zod.dev/

### Database & ORM
- `supabase`: https://supabase.com/
- `drizzle`: https://orm.drizzle.team/

### Caching & State Management
- `tanstack-query`: https://tanstack.com/query/latest

### Deploy on Vercel
- `vercel`: https://vercel.com/

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
