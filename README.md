# Connectify

Connectify is a full-stack video conferencing app for real-time communication. A React client handles the user interface, while an Express + Socket.IO server manages accounts, meeting history, and WebRTC signaling.

**Author:** Vishal Singh

## Demo

Try it here: [Connectify on Render]()

## Features

- Sign up and log in with your own account
- Client-side session management using a stored auth token
- Enter a meeting code to join a call
- Live peer-to-peer video powered by WebRTC
- Socket.IO signaling for room presence and media negotiation
- Text chat during meetings
- Screen sharing
- Meeting history for logged-in users

## How It's Organized

The repository holds two separate apps:

- `frontend/` – the React client, covering authentication, routing, the meeting screen, chat, and media controls
- `backend/` – the Express REST API and Socket.IO server, covering user accounts, saving meeting history, and real-time signaling

### Frontend–Backend Communication

1. The client calls the REST API at `/api/v1/users` for authentication and history.
2. On successful login, the returned token is saved in the browser's `localStorage`.
3. Joining a meeting opens a Socket.IO connection to the server.
4. Socket events handle room membership, peer signaling, chat messages, and disconnects.
5. The backend writes meeting activity to MongoDB around the time a user joins.

## Technologies

**Frontend:** React, React Router, Material UI, Axios, Socket.IO Client, Create React App

**Backend:** Node.js, Express, Socket.IO, MongoDB, Mongoose, bcrypt, dotenv

## Project Layout

```text
.
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── controllers/
│   │   ├── models/
│   │   └── routes/
│   └── README.md
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── utils/
│   └── README.md
└── README.md
```

## Local Setup

### Requirements

- Node.js 18 or newer
- npm
- A MongoDB connection string

### Step 1: Backend

```bash
cd backend
npm install
```

Add a `.env` file inside `backend/`:

```env
PORT=8000
ENV_PORT=8000
MONGO_URI=your_mongodb_connection_string
LOCAL_DB=your_local_mongodb_connection_string
```

Then start the server:

```bash
npm run dev
```

### Step 2: Frontend

```bash
cd frontend
npm install
npm start
```

By default the client is served at `http://localhost:3000`.

### Step 3: Point the Frontend at the Right API

The backend URL is selected in [`frontend/src/environment.js`](./frontend/src/environment.js).

- Set `IS_PROD = false` when developing locally
- Make sure the local backend address is `http://localhost:8000`

## More Details

- Frontend: [`frontend/README.md`](./frontend/README.md)
- Backend: [`backend/README.md`](./backend/README.md)