<img src="public/icon9.png" height="100" width="100"></img>

# NoteShare

🔗 **Live Demo:** [NoteShare](https://sharemynotes.vercel.app)

If Reddit and Studocu had a baby, it would be **NoteShare** – a collaborative platform where students and professionals can easily share, discover, and discuss notes and study materials.

## Getting Started for local development

### Installation

```bash
npm install
```

### Database Setup

**Build docker container**

```bash
docker-compose up --build
```

**Set up db tables according to the prisma schema**  
This directly applies your current Prisma schema to the DB according to `prisma/schema.prisma`

```bash
npx prisma db push
npx prisma generate # if you need to regenerate Prisma client functions
```

**Seed the database with dummy data according to `prisma/seed.js`**

```bash
npx prisma db seed
```

### Running the Development Server

```bash
npm run dev
```

Then, open [http://localhost:3000](http://localhost:3000) in your browser to access the application.

### Teardown: Clean up Docker container

```bash
docker stop $(docker ps -q)        # stops all running containers
docker rm $(docker ps -aq)         # removes all containers
docker-compose down -v             # stops containers & deletes associated volumes
```

## How to make changes to production database

**Step 1: make your changes to the schema at `prisma/schema.prisma`**

**Step 2: Create the new migration file at `prisma/migration`**

```bash
npx prisma migrate dev --name <name of migration>
```

💡 Note: Insert the name of the migration eg: add_user_table

**Step 3: Execute the relevant migration files to the production database**

```bash
npx prisma migrate deploy
```
