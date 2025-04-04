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

### Set up for database

To build the docker container:

```bash
docker-compose up --build
```

To create the database based on `prisma/schema.prisma`:

- [**For local db**] This will create the new db directly according to `prisma/schema.prisma`

  ```bash
  npx prisma db push
  ```

- [**For production db**] This will create the new db according to the migration files at `prisma/migrations`.  
  (In order to generate new migration files after editing `prisma/schema.prisma`, run `npx migrate dev`)
  ```bash
  npx prisma migrate deploy
  ```

To seed the database with dummy data according to `prisma/seed.js`:

```bash
npx prisma db seed
```

To delete the docker volume:

```bash
docker-compose down -v
```

### Running the Development Server

Start the development server:

```bash
npm run dev
```

Then, open [http://localhost:3000](http://localhost:3000) in your browser to access the application.
