## Setup Instructions

### 1. Initialize Node.js project

```
npm init -y
```

This will creates a `package.json`.

```
"type": "module",
```

### 2. Install Express and dotenv

```
npm i express dotenv
```

Installs Express.js

### 3. Install Nodemon as Dev dependability

```
npm install nodemon -D
```

Nodemon automatically restarts Node application 

### 4. Install Prisma

```
npm install prisma --save-dev
npm install @prisma/client
```

- Prisma CLI (development dependency) helps manage your database
- Prisma Client is the auto-generated query builder for your database

### 5. Initialize Prisma

```
npx prisma init
```

Creates a Prisma configuration file (`schema.prisma`) and `.env` file for environment variables.

### 6. Start PostgreSQL in Docker

```
docker run --name postgresDb -e POSTGRES_USER=user1 -e POSTGRES_PASSWORD=password1 -p 5432:5432 -d postgres
```

This command:

- Creates a Docker container named "postgresDb"
- Sets username to "user1" and password to "password1"
- Maps port 5432 (PostgreSQL default) to your local machine
- Runs in detached mode (`-d`)

### 7. Set Database URL

In your `.env` file, add:

```
DATABASE_URL="postgresql://user1:password1@localhost:5432/postgres"
```

This tells Prisma how to connect to your PostgreSQL database.

### 8. Generate Prisma Client

```
npx prisma generate
```

Creates the Prisma Client based on your schema.

### 9. Create and run migrations

```
npx prisma migrate dev
```

Creates database tables based on your Prisma schema and runs the migration.

### 10. Push schema to database (alternative to migrate)

```
npx prisma db push
```

Alternative to migrations - directly pushes your Prisma schema to the database.

## DB Connected Successfully

```
npm i bcryptjs
```

```
npm i cookie-parser
```
