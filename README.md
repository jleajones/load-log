This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## Deploy on ZEIT Now

#### Env Vars
- [x] HERE Maps API Key
- [x] Posgres DB Connection String
- [x] GraphQL API URI

### DB Files
- [ ] Create `db` directory in the root of the project
- [ ] Create child `data` directory

## Check List
- [x] Nextjs
- [x] Git Repo
- [x] Prettier
- [x] Eslint
    - [x] babel-parser
    - [x] airbnb config
    - [x] prettier config
- [x] Now Deployment

#### Client
- [x] Load Page
    - [ ] Load Input
        - [ ] AutoComplete
        - [ ] Add Input
    - [ ] Map
        - [ ] Route
        - [ ] Markers (stops)
- [x] Setup Apollo Client
    - [x] Install apollo-client
    - [x] Install apollo-cache-inmemory
    - [x] Install apollo-link-http
    - [x] Install @apollo/react-hooks
    - [x] Create `withApollo` HOC
    - [x] SSR with @apollo/react-ssr
- [ ] Create Account Page
- [ ] Login Page
- [ ] My Account Page
- [ ] Dashboard

#### Server
- [x] Setup GraphQL
    - [x] Install graphql-tools
    - [x] Install graphql-tag
    - [x] Install graphql-tools
- [x] Install Apollo Server Micro
- [x] Create DB (load-log)
- [x] Init knex
    - [x] Install knex
    - [x] Migrations/Seeds
        - [x] Loads
        - [x] Locations
        - [x] Address
        - [x] Positions
        - [x] Users
- [x] Setup Remote DB
    - [x] Heroku
    - [x] Docker Container - https://hub.docker.com/_/postgres
