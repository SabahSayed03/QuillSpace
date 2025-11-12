# QuillSpace

QuillSpace is a simple full-stack blogging/sample-posts application. The project is split into a backend (Express + MySQL) that exposes a REST API and a frontend (React + Vite) that consumes the API to create, read, update, delete and export posts as CSV.

## Tech stack
- Backend: Node.js (ES modules), Express, MySQL (mysql2), json2csv
- Frontend: React (Vite), axios, react-router-dom, react-toastify, TailwindCSS/Bootstrap (project includes styles)

## Repository layout

```
QuillSpace/
  backend/              # Express backend (API)
    db.js               # MySQL connection
    server.js           # Express app bootstrap
    controllers/        # Controllers (postController.js)
    routes/             # API routes (posts.js)
    utils/              # Helpers (exportCSV.js)
    package.json
  frontend/             # React + Vite frontend
    src/
      pages/            # CreatePost, EditPost, Home, ReadPost
      api.js            # client API wrapper (axios)
    package.json
    README.md           # Frontend template README

```

## Features
- Full CRUD for posts (title, content, author)
- Export posts to CSV
- Simple REST API at `/api/posts`

## Prerequisites
- Node.js (recommended 18.x or newer). You can check your version with `node -v`.
- npm (comes with Node) or yarn
- A running MySQL server and credentials with permission to create/use a database.

## Backend — configuration & run

1. Open a terminal and install dependencies:

```powershell
cd backend
npm install
```

2. Create a `.env` file in the `backend` folder with these variables (example):

```text
# .env (example)
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=quillspace_db
DB_PORT=3306
```

3. Create the MySQL database and the `posts` table. Example SQL to create a minimal table used by the controllers:

```sql
CREATE DATABASE IF NOT EXISTS quillspace_db;
USE quillspace_db;

CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

4. Run the backend in development (uses nodemon) or production:

```powershell
# development
npm run dev

# production
npm start
```

The server listens on `process.env.PORT` (default 5000). The API base path is `/api/posts`.

## Frontend — configuration & run

1. Install frontend dependencies and run dev server:

```powershell
cd frontend
npm install
npm run dev
```


3. Build for production:

```powershell
cd frontend
npm run build
# to preview the built app
npm run preview
```



## Environment variables reference
- PORT — port for the Express server (defaults to 5000)
- DB_HOST — MySQL host
- DB_USER — MySQL username
- DB_PASSWORD — MySQL password
- DB_NAME — MySQL database name
- DB_PORT — MySQL port (defaults to 3306)




Author
Name:Sabah Sayed