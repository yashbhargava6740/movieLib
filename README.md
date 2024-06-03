# Movie Library Web Application

## Overview

This project is a Movie Library Web Application that allows users to sign in, search for movies, create and manage movie lists. The lists can be set to public or private, and the movie data is fetched using the OMDB API.

## Features

1. *User Authentication:*
   - Sign In/Sign Up functionality.

2. *Home Screen:*
   - After logging in, users can search for movies.
   - Display detailed information about searched movies.

3. *Movie Lists:*
   - Users can create, manage, and delete lists of movies.
   - Lists can be marked as public (viewable by anyone with the link) or private (viewable only by the creator).

4. *Nice Layout:*
   - Search & List pages are designed with a modern, user-friendly layout.

## Tech Stack

- *Frontend:*
  - *TypeScript*
  - *React*
  - *Vite*
  - *Tailwind CSS*
  - *Daisy UI*
  - *Zustand* for state management

- *Backend:*
  - *Node.js*
  - *Express.js*
  - *MongoDB*
  - *JWT* for authentication
  - *Redis* for caching

- *Hosting:*
  - *Frontend*: Hosted on Netlify
  - *Backend*: Hosted on Render

## Installation and Setup

### Prerequisites

- Node.js and npm installed
- MongoDB instance running

### Backend Setup

1. Clone the repository:
   sh
   git clone <repository-url>
   cd backend
   

2. Install dependencies:
   sh
   npm install
   

3. Create a .env file in the root of the backend directory and add the following variables:
   env
   - PORT=8000
   - MONGODB_URI=your_mongodb_uri
   - JWT_SECRET=your_jwt_secret
   - OMDB_API_KEY=your_omdb_api_key
   - UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
   - UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
   

4. Start the backend server:
   sh
   - npm start
   

### Frontend Setup

1. Navigate to the frontend directory:
   sh
   - cd frontend
   

2. Install dependencies:
   sh
   - npm install

   
3. Start the frontend development server:
   sh
   - npm run dev
   

### Hosting

- The frontend is hosted on Netlify.
- The backend is hosted on Render.

## Usage

1. *Sign Up / Sign In:*
   - Users can sign up for a new account or sign in with existing credentials.

2. *Search Movies:*
   - Use the search bar on the home screen to find movies by title.
   - Click on a movie to view detailed information.

3. *Create Movie Lists:*
   - Create new movie lists from the home screen.
   - Add movies to your lists.
   - Set lists to public or private.

4. *View and Manage Lists:*
   - View your movie lists on the home screen.
   - Manage (edit/delete) your lists.

## Project Links

- *Live Application*: [Netlify Link](https://movielibv2.netlify.app/)
- *Backend API*: [Render Link](https://movielib-1.onrender.com)
- *Source Code*: [GitHub Repository](https://github.com/yashbhargava6740/movieLib)

## Contributing

Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.

---

This README file should help you understand the project, set it up, and use it effectively. Enjoy exploring and managing your movie library!
