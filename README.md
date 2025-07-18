# Leaderboard 

A full-stack Leaderboard  built with **Node.js**, **Express**, **MongoDB**, and **ReactJS**. The app allows users to be added, claim random points, view leaderboards with pagination, and track claim history.

## Features
    Add new users
    Claim random points
    Maintains history of each user's claims

    Add User via Modal form
    Claim Points for a selected user
    Podium display for top 3 users (sticky on every page)
    Paginated leaderboard (10 users per page)
    Real-time updates
    Claim history tracking

## Tech Stack
| Frontend                | Backend                  | Database   |
|-------------------------|--------------------------|------------|
| React + Vite            | Node.js + Express        | MongoDB Atlas
| Tailwind CSS            | Mongoose (ODM)           |            |
| Headless UI (dropdown)  | dotenv                   |            |

## Setup Instructions

 1. Clone the Repo
    ```bash
    git clone https://github.com/kapildagar600/leaderboard-system.git
    cd leaderboard-system

 2. Setup Backend
    cd backend
    npm install

   Create .env file
    PORT=5000
    MONGODB_URI=mongodb+srv://<your-mongodb-uri>

    Start the Server
    npm run dev


3. Setup Frontend
    cd frontend
    npm install
    npm run dev

## API Endpoints

### Backend

   1. Users
    POST /api/users – Add new user
    GET /api/users – Fetch all users

    2. Claim Points
    POST /api/claim/:userId – Claim random points
    GET /api/claim/:userId – Claim history for a user

    3. Leaderboard
    GET /api/leaderboard?page=1&limit=10 – Paginated leaderboard sorted by total points

   
    
    




