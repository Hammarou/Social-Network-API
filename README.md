# Social Network API

## Table of Contents

- [Description](#description)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Application Screenshots](#application-screenshots)
- [Video Demonstration](#video-demonstration)
- [GitHub Repository Location (HTTPS)](#github-repository-location)
- [GitHub Deployment Location (HTTPS)](#github-deployment-location-https)
- [Credits](#credits)
- [Contributions](#contributions)
- [License](#license)


## Description

-Greetings!

The **Social Network API** is an application where users can connect online to create a friend list, network, and share thoughts and ideas. The application utilizes the Express.js framework to define the routing capabilities and the MongoDB database platform to store, manage, and retrieve data.


## Technologies Used

- **Node.js:** Runtime environment for executing JavaScript server-side.
- **Express.js:** A lightweight web application framework designed to efficiently build web and mobile based applications through Node.js.
**MongoDB:** A high-performance NoSQL database platform that provides users with a scaleable and flexible means of storing, managing, and retrieving data. 
- **Mongoose ODM:** A library that acts as a wrapper for the MongoDB database that makes it easier to interact with the database.


## Installation

To run this application locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone github.com/Hammarou/Social-Network-API
   ```

2. Navigate to the application directory:
   ```sh
   cd Social-Network-API
   ```

3. Install the dependencies:
   ```sh
   npm install
   ```

## Usage

To start the application, use the command: 

```sh 
npm start
```

### API Routes

`/api/users`

- `GET` all users

- `GET` a single user by its _id and populated thought and friend data

- `POST` a new user:

```javascript
// example data
{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}
```
- `PUT` to update a user by its _id

- `DELETE` to remove user by its _id

`/api/users/:userId/friends/:friendId`

- `POST` to add a new friend to a user's friend list

- `DELETE` to remove a friend from a user's friend list

`/api/thoughts`

- `GET` to get all thoughts

- `GET` to get a single thought by its _id

- `POST` to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

```javascript
// example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
```

- `PUT` to update a thought by its _id

- `DELETE` to remove a thought by its _id

`/api/thoughts/:thoughtId/reactions`

`POST` to create a reaction stored in a single thought's reactions array field

`DELETE` to pull and remove a reaction by the reaction's reactionId value


## Video Demonstration

To view a video demonstration of the application, please click the following link:

[Video Demonstration Link](https://drive.google.com/file/d/1dzzfmui4AAPaPqQQH00KbcawgCi0gtem/view?usp=drive_link)

## GitHub Repository Location (HTTPS)

https://github.com/Hammarou/Social-Network-API


## GitHub Deployment Location (HTTPS)

N A

* Note: The **Social Network API** is a node.js command line interface (CLI) application. Therefore, it cannot be hosted through an internet browser.


## Credits

N/A


## Contribution

Feel free to fork this application, submit issues, or make pull requests if you have suggestions or improvements. Contributions are welcome!

## License

This applicatiom is licensed under the [MIT](LICENSE) license.