# Expert Session Booking System

Welcome to the Real-Time Expert Session Booking System! This full-stack application allows users to find experts, view their availability, and book one-on-one sessions in real-time. Built with a modern MERN stack (MongoDB, Express, React, Node.js) and integrated with Socket.io for live updates.

## Features

- **Browse Experts**: Search, filter, and paginate through a list of available experts.
- **View Expert Profiles**: See detailed information about each expert, including their skills, experience, and available time slots.
- **Real-Time Booking**: Book a session and see the availability update instantly for all other users.
- **My Bookings**: View and manage your upcoming and past bookings.
- **Responsive Design**: A clean, modern, and mobile-friendly user interface.

## Tech Stack

- **Frontend**:
  - [React](https://reactjs.org/)
  - [Vite](https://vitejs.dev/)
  - [Socket.io Client](https://socket.io/docs/v4/client-api/)
  - [Axios](https://axios-http.com/) for API requests
  - [React Router](https://reactrouter.com/) for navigation

- **Backend**:
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
  - [Socket.io](https://socket.io/) for real-time communication

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14 or newer)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running, or a MongoDB Atlas account.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd SDE-Intern
```

### 2. Configure Environment Variables

You'll need to set up environment variables for both the frontend and backend.

**For the backend:**

Navigate to the `backend` directory and create a `.env` file from the example:

```bash
cd backend
cp .env.example .env
```

Now, open `backend/.env` and fill in your details:

```env
# The port your backend server will run on
PORT=5001

# Your MongoDB connection string
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority

# The URLs of your frontend client (for CORS)
CLIENT_URL=http://localhost:5173
```

**For the frontend:**

Navigate to the `frontend` directory and create a `.env` file:

```bash
cd ../frontend
cp .env.example .env
```

Open `frontend/.env` and point it to your backend server:

```env
# The base URL for your backend API
VITE_API_BASE_URL=http://localhost:5001/api

# The URL for your Socket.io server
VITE_SOCKET_URL=http://localhost:5001
```

### 3. Install Dependencies & Run

Let's get both servers running.

**Backend Server:**

Open a terminal in the `backend` directory:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Your backend should now be running on the port you specified (e.g., `http://localhost:5001`).

**Frontend Server:**

Open a second terminal in the `frontend` directory:

```bash
# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Your frontend application should now be running on `http://localhost:5173`.

## Deployment

This application is ready to be deployed to your favorite hosting services.

### Frontend

1.  **Build for Production**: Run `npm run build` in the `frontend` directory. This will create a `dist` folder.
2.  **Deploy**: Deploy the `dist` folder to a static hosting provider like Vercel, Netlify, or GitHub Pages.
3.  **Environment Variables**: Make sure to set your production `VITE_API_BASE_URL` and `VITE_SOCKET_URL` in your hosting provider's settings.

### Backend

1.  **Hosting**: Deploy the `backend` folder to a service like Render, Railway, or Fly.io.
2.  **Environment Variables**: Set the `PORT`, `MONGO_URI`, and `CLIENT_URL` (pointing to your deployed frontend URL) in your hosting provider's environment settings.
3.  **Start Command**: The start command should be `npm start` or `node server.js`.

## API Reference

For detailed information on the available API endpoints, please see the [API Reference Guide](./API_REFERENCE.md).

---

Happy coding!