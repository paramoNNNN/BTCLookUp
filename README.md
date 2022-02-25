This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# File Structure

```
|
├── .github
|   |
│   └── workflows
│      └── checkChanges.yml
|   
├── components
│   ├── Button 
│   ├── Header 
│   ├── Inputs 
│   ├── Loading 
│   ├── Menu 
│   ├── Notifications 
│   └── Select 
| 
├── configs
│   ├── axios.ts 
│   └── endpoints.ts 
| 
├── consts
│   └── index.ts 
| 
├── cypress
│   ├── fixtures 
│   ├── integration 
│   ├── plugins 
│   └── support 
| 
├── features
│   └── Search 
| 
├── layout
│   └── MainLayout.tsx 
| 
├── pages
│   ├── address 
│   │   └── [query].page.tsx
|   |
│   ├── api 
│   │   ├── @types
│   │   ├── config
│   │   ├── consts
│   │   ├── utils
│   │   └── v1
│   │       ├── address
│   │       ├── subscribe
│   │       └── transaction
|   |
│   ├── transaction 
│   │   └── [query].page.tsx
|   |
│   ├── _app.page.tsx 
│   └── index.page.tsx 
| 
| 
├── public 
│   ├── favicon.ico 
│   └── vercel.svg 
| 
├── styles 
│   └── global.css 
| 
├── utils 
│   └── index.ts 
| 
├── .editorconfig 
├── .env.example 
├── .eslintrc.json 
├── .gitignore 
├── .prettierrc 
├── commitlint.config.js 
├── cypress.json 
├── next-env.d.ts
├── next.config.js
├── package.json
├── postcss.json
├── README.md
├── tailwind.config.js
├── tsconfig.json
└── yarn.lock
```


## Available Scripts

### `yarn dev`

Starts development server

### `yarn build`

Builds the app for production

### `yarn start`

Starts the app after running `yarn build`

### `yarn lint`

Starts next lint

### `yarn cypress`

Opens Cypress GUI

### `yarn cypress:run`

Runs Cypress tests in headless mode

### `yarn prepare`

Installs husky hooks

### `yarn type-check`

Runs tsc type checking

### API

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api](http://localhost:3000/api). 

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.


## Setup

To setup the project:

1. Create a Supabase account [Supabase documentation](https://supabase.com/docs/guides/with-nextjs)

2. Set required keys in `.env`

3. Create required tables in Supabase

4. You're good to go

### Create required tables

We need to create two tables in Supabase panel

1. `subscribedHashes`:
    - Create a table and name it `subscribedHashes` and add these columns:
      - `id`: `int8`
      - `user`: `text`
      - `hash`: `text`
      - `type`: `text`
      - `info`: `json`
      - `created_at`: `timestamptz` (optional)
2. `notifications`:
    - Create a table and name it `notifications` and add these columns:
      - `id`: `int8`
      - `hash`: `int8` which is a relation to `id` of `subscribedHashes` table
      - `user`: `text`
      - `created_at`: `timestamptz` (optional)


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
