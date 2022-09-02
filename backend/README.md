## Getting started

Install npm dependencies:

```
cd backend
npm install or yarn install
```

### 2. Create the database

```
npx prisma migrate dev --name init
```

### 3. Start the REST API server

```
npm run dev
```

The server is now running on `http://localhost:3333`. You can now the API requests, e.g. [`http://localhost:3333/api`](http://localhost:3000/feed).
