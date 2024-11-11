# Social Network API

![License](https://img.shields.io/badge/license-MIT-blue)
![Express.js](https://img.shields.io/badge/Express.js-4.x-orange)
![MongoDB](https://img.shields.io/badge/MongoDB-5.x-green)
![Mongoose](https://img.shields.io/badge/Mongoose-6.x-red)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![Node.js](https://img.shields.io/badge/Node.js-14.x-green)

## Description

The Social Network API is a backend application designed to serve as the foundation for a social networking site where users can share their thoughts, react to friends' thoughts, and manage friend lists. This project is built using Express.js for routing, a MongoDB database, and Mongoose ODM for data management. The API handles large amounts of unstructured data, ideal for social media applications.

Since this application is not deployed, a walkthrough video is provided to demonstrate its functionality and acceptance criteria.

## Table of Contents

- [Social Network API](#social-network-api)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Demo](#demo)
  - [API Endpoints](#api-endpoints)
    - [Users](#users)
    - [Thoughts](#thoughts)
    - [Reactions](#reactions)
    - [Friends](#friends)
  - [Technologies Used](#technologies-used)
  - [License](#license)
  - [Questions](#questions)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/savevsgames/SocialNetworkAPI.git
   ```
2. Navigate to the project directory:
   ```bash
   cd SocialNetworkAPI
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. First configure the .env for your own MongoDB connection, then seed your database, then start the server:

   .env example variable (use your own connection string):
   MONGODB_URI=mongodb://127.0.0.1:27017/socialnetworkDB

   ```bash
   npm run seed
   npm run start
   ```

2. Use Insomnia or a similar API client to test the API routes.

## Demo

A video walkthrough demonstrating the app’s functionality is available at:
**[./assets/social-network-api-walkthrough.mp4](./assets/social-network-api-walkthrough.mp4)**

Alternate Download Link (GoogleDrive):
**[https://drive.google.com/file/d/1XOs7tZx6xhq6hPeIE6al7reIROj-U1rS/view?usp=sharing](https://drive.google.com/file/d/1XOs7tZx6xhq6hPeIE6al7reIROj-U1rS/view?usp=sharing)**

## API Endpoints

### Users

- **GET /api/users** - Retrieve all users
- **GET /api/users/:id** - Retrieve a single user by ID
- **POST /api/users** - Create a new user
- **PUT /api/users/:id** - Update an existing user
- **DELETE /api/users/:id** - Delete a user

### Thoughts

- **GET /api/thoughts** - Retrieve all thoughts
- **GET /api/thoughts/:id** - Retrieve a single thought by ID
- **POST /api/thoughts** - Create a new thought
- **PUT /api/thoughts/:id** - Update an existing thought
- **DELETE /api/thoughts/:id** - Delete a thought

### Reactions

- **POST /api/thoughts/:thoughtId/reactions** - Add a reaction to a thought
- **DELETE /api/thoughts/:thoughtId/reactions/:reactionId** - Remove a reaction from a thought

### Friends

- **POST /api/users/:userId/friends/:friendId** - Add a friend to a user's friend list
- **DELETE /api/users/:userId/friends/:friendId** - Remove a friend from a user's friend list

## Technologies Used

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## License

This project is licensed under the MIT License.

## Questions

For additional questions, please reach out:

- **Author**: Greg Barker
- **Email**: gregcbarker@gmail.com
- **GitHub**: [savevsgames](https://github.com/savevsgames)

```

```
