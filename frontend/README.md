# Connectify Frontend

The frontend is a React single-page app that covers sign-in, joining meetings, viewing meeting history, and the live meeting screen. It talks to the backend through REST for account and history requests, and through Socket.IO for real-time meeting events.

**Author:** Vishal Singh

## Technologies

- React
- React Router DOM
- Material UI
- Axios
- Socket.IO Client
- Create React App

## Features

- Landing page with options to join as a guest or sign in
- Sign-in and sign-up flow
- Protected home route guarded by a higher-order component
- Join a meeting using a meeting code
- Live meeting room with:
  - camera on/off
  - microphone on/off
  - screen sharing
  - chat
  - peer-to-peer video and audio over WebRTC
- Meeting history page for logged-in users

## Folder Layout

```text
frontend/
├── public/
│   ├── BG.png
│   ├── mobile2.png
│   └── index.html
├── src/
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── AuthenticationPage.jsx
│   │   ├── history.jsx
│   │   ├── home.jsx
│   │   ├── LandingPage.jsx
│   │   └── videoMeet.jsx
│   ├── styles/
│   │   └── videoComponent.module.css
│   ├── utils/
│   │   └── withAuth.jsx
│   ├── App.js
│   ├── environment.js
│   └── index.js
└── README.md
```

## Main Pieces

### Routing

[`src/App.js`](./src/App.js) sets up the main routes:

- `/` – landing page
- `/auth` – login and registration
- `/home` – meeting entry for signed-in users
- `/history` – past meetings
- `/:url` – the video meeting room

### Auth Context

[`src/contexts/AuthContext.jsx`](./src/contexts/AuthContext.jsx) gathers these responsibilities in one place:

- Registering users
- Logging users in
- Fetching meeting history
- Saving the meeting codes a user has joined

### Route Protection

[`src/utils/withAuth.jsx`](./src/utils/withAuth.jsx) sends visitors to `/auth` if there is no token in `localStorage`.

### Meeting Screen

[`src/pages/videoMeet.jsx`](./src/pages/videoMeet.jsx) takes care of:

- Asking for camera and microphone permissions
- Setting up peer connections
- Signaling over the socket
- Screen sharing
- Chat state
- Rendering local and remote video

## Getting Started

### Requirements

- Node.js 18 or newer
- npm
- A running backend server

### Install Packages

```bash
cd frontend
npm install
```

### Start the App

```bash
npm start
```

The app is served at `http://localhost:3000`.

## npm Scripts

- `npm start` – launches the development server
- `npm run build` – produces a production build
- `npm test` – runs the tests

## Environment Variables

The frontend does not need any environment variables right now.

All configuration lives in [`src/environment.js`](./src/environment.js). If you later switch to environment-based configuration, this is the place to document variables such as the API base URL.