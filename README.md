<img src="public/icon9.png" height="100" width="100"></img>

# NoteShare

🔗 **Live Demo:** [NoteShare](https://sharemynotes.vercel.app)

If Reddit and Studocu had a baby, it would be **NoteShare** – a collaborative platform where students and professionals can easily share, discover, and discuss notes and study materials.

## Getting Started

### Installation

```bash
npm install
```

### Database Setup

**Build docker container**:

```bash
docker-compose up --build
```

**Initialize the database**:

- **For local development** (quick setup, no migration tracking)  
  This directly applies your current Prisma schema to the DB according to `prisma/schema.prisma`:

  ```bash
  npx prisma db push
  ```

- **For production** (with migration tracking)  
  This applies the versioned migration files in `prisma/migrations`:
  ```bash
  npx prisma migrate deploy
  ```
  💡 Note: In order to generate new migration files after editing `prisma/schema.prisma`, run `npx migrate dev`

**Seed the database with dummy data according to `prisma/seed.js`:**

```bash
npx prisma db seed
```

**Clean up Docker volumes (remove data):**

```bash
docker-compose down -v
```

### Running the Development Server

```bash
npm run dev
```

Then, open [http://localhost:3000](http://localhost:3000) in your browser to access the application.
