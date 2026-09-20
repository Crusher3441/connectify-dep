# Connectify Backend

This server handles user authentication, stores meeting history, and provides real-time signaling for Connectify. It offers a REST API for account-related actions and runs a Socket.IO server on the same HTTP server to manage meeting rooms.

**Author:** Vishal Singh

## Technologies

- Node.js
- Express
- Socket.IO
- MongoDB
- Mongoose
- bcrypt
- dotenv
- nodemon

## What the Backend Does

- Registers new users and verifies logins
- Creates and saves session tokens
- Records each user's meeting history
- Serves REST endpoints for the client
- Manages Socket.IO room joins, signaling, chat, and disconnects

## Folder Layout

```text
backend/
├── src/
│   ├── app.js
│   ├── controllers/
│   │   ├── socketManager.js
│   │   └── user.controller.js
│   ├── models/
│   │   ├── meeting.model.js
│   │   └── user.model.js
│   └── routes/
│       └── users.routes.js
├── package.json
└── README.md
```

## How It Works

### Server Entry Point

[`src/app.js`](./src/app.js) does the following:

- Loads environment variables
- Creates the Express app and the HTTP server
- Attaches Socket.IO using `connectToSocket`
- Connects to MongoDB
- Mounts the `/api/v1/users` routes

### Routes

[`src/routes/users.routes.js`](./src/routes/users.routes.js) exposes these endpoints:

- `POST /api/v1/users/register`
- `POST /api/v1/users/login`
- `POST /api/v1/users/add_to_activity`
- `GET /api/v1/users/get_all_activity`

### Controllers

[`src/controllers/user.controller.js`](./src/controllers/user.controller.js) is responsible for:

- Registering users with hashed passwords
- Logging users in by checking their password
- Generating tokens
- Creating and fetching meeting history

[`src/controllers/socketManager.js`](./src/controllers/socketManager.js) listens for these events:

- `join-call`
- `signal`
- `chat-message`
- `disconnect`

Together these form the signaling layer behind the frontend's WebRTC meetings.

### Schemas

The database schemas are defined in the `src/models/` folder:

- [`src/models/user.model.js`](./src/models/user.model.js) – user schema with `name`, `username`, `password`, and the session `token`
- [`src/models/meeting.model.js`](./src/models/meeting.model.js) – meeting schema with `user_id`, `meetingCode`, and `date`

## API Reference

### `POST /api/v1/users/register`

Creates a new user account.

Request body:

```json
{
  "name": "testuser",
  "username": "testusername",
  "password": "securePassword"
}
```

### `POST /api/v1/users/login`

Checks the credentials and returns a session token.

Request body:

```json
{
  "username": "testusername",
  "password": "securePassword"
}
```

Successful response:

```json
{
  "token": "generated_session_token"
}
```

### `POST /api/v1/users/add_to_activity`

Saves a meeting code to the user's history.

Request body:

```json
{
  "token": "generated_session_token",
  "meeting_code": "abc123"
}
```

### `GET /api/v1/users/get_all_activity`

Returns every meeting linked to the authenticated user.

Query parameter:

```text
token=generated_session_token
```

## Environment Variables

Add a `.env` file to `backend/` containing:

```env
PORT=8000
ENV_PORT=8000
MONGO_URI=your_remote_mongodb_connection_string
LOCAL_DB=your_local_mongodb_connection_string
```

### Notes

- The server port comes from `PORT` or `ENV_PORT`
- `MONGO_URI` is the database connection the app actually uses
- `LOCAL_DB` appears in the code but is not currently used to pick a connection

## Running Locally

### Install Packages

```bash
cd backend
npm install
```

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

With `PORT=8000`, the server listens at `http://localhost:8000`.

## npm Scripts

- `npm run dev` – runs the server with nodemon
- `npm start` – runs the server with Node.js
- `npm run prod` – runs the app under PM2