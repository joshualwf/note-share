🚧 Work in Progress – This project is actively being developed and improved.
# NoteShare

🔗 **Live Demo:** [NoteShare](https://sharemynotes.vercel.app)

If Reddit and Studocu had a baby, it would be **NoteShare** – a collaborative platform where students and professionals can easily share, discover, and discuss notes and study materials.

## Getting Started

### Installation

First, install the dependencies:

```bash
npm install
```

### Setting Up Local DB (Postgres) - For Development Only

```bash
docker-compose up --build
```

To access the database:
```bash
docker exec -it postgres-db psql -U myuser -d mydatabase
```
To view tables:
```bash
\dt
```
To exit:
```bash
\q
```

### Resetting the Local DB (Postgres) - For Development Only
To delete the docker volume:
```bash
docker-compose down -v
```

To build the docker container:
```bash
docker-compose up --build
```

To create the database:
```bash
npx prisma db push | npx prisma migrate deploy
```
Migrations: Applies all previously created migrations to the fresh DB, requires you’ve already done prisma migrate dev or prisma migrate reset in the past

To seed the database:
```bash
npx prisma db seed
```

### Running the Development Server

Start the development server:

```bash
npm run dev
```

Then, open [http://localhost:3000](http://localhost:3000) in your browser to access the application.
