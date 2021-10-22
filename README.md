# Wiki Map

This is Wiki Map. It is a single page web application with a responsive design that let users to create and modify maps and points and share with other users. (This application integrated google map API)

## Team
- Tom https://github.com/tomthebarbarian
- Rameesa https://github.com/RameesaRijas
- Brandon https://github.com/niubrandon
## Project features
- users can see a list of the available maps
- users can view a map
- a map can contain many points
- each point can have: a title, description, and image
- authenticated users can create maps -fix bug
- authenticated users can modify maps (add, edit, remove points)
- users can favourite a map
- users have profiles, indicating their favourite maps and maps they've contributed to

## Live demonstration
![demo](https://user-images.githubusercontent.com/16887712/138380590-604f7425-265e-40d0-912f-92412a6fa799.gif)
## Project API endpoints

<table>
 <thead>
      <tr>
         <th>Route</th>
         <th>Method</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
        <td>
         <th>/api/users/register</th>
         <th>POST</th>
         <th>Create a new user</th>
      </td>
      <tr>
         <td>/api/users/login</td>
         <td>POST</td>
         <td>Post user login</td>
      </tr>
      <tr>
         <td>/api/maps/</td>
         <td>GET</td>
         <td>Get a list of maps</td>
      </tr>
        <tr>
         <td>/api/maps/usermaps</td>
         <td>GET</td>
         <td>Get a list of maps from an auth user</td>
      </tr>
        <tr>
         <td>/api/maps/:id</td>
         <td>GET</td>
         <td>Get a single map from mapID</td>
      </tr>
        <tr>
         <td>/api/maps/:id/points</td>
         <td>GET</td>
         <td>Get all points of a single map</td>
      </tr>
        <tr>
         <td>/api/maps/:id/points</td>
         <td>POST</td>
         <td>Add a point for a single map</td>
      </tr>
        <tr>
         <td>/api/maps/points/:pointid/update</td>
         <td>PUT</td>
         <td>Update a point for a single map</td>
      </tr>
        <tr>
         <td>/api/maps/points/:pointid/delete</td>
         <td>DELETE</td>
         <td>Delete a point for a single map</td>
      </tr>
        <tr>
         <td>/api/maps/:userid/addmap</td>
         <td>POST</td>
         <td>Add a map for an auth user</td>
      </tr>
        <tr>
         <td>/api/maps/:userid/deletemap/:id</td>
         <td>DELETE</td>
         <td>Delete a map belongs to an auth user</td>
      </tr>
        <tr>
         <td>/api/maps/:userid/updatemap/:id</td>
         <td>PUT</td>
         <td>Update a map belongs to an auth user</td>
      </tr>
        <tr>
         <td>/api/maps/</td>
         <td>GET</td>
         <td>Get a list of maps</td>
      </tr>
   </tbody>
</table>


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Express.js
- Bcryptjs
- Chalk
- Cookie-session
- Dotenv
- Method-override
- Morgan
- Sass



## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`
