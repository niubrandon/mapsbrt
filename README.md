# Wiki Map

A single page application that let users to create and modify maps with points labelled and share with other users.

## Project description


## Pictures show how to user this application

## Porject structure

## Project API endpoints

<table>
 <thead>
      <tr>
         <th>Endpoint</th>
         <th>Action</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
        <tr>
         <th>/api/users</th>
         <th>GET</th>
         <th>Get all users</th>
      </tr>
      <tr>
         <td>data1</td>
         <td>data2</td>
         <td>data3</td>
      </tr>
      <tr>
         <td>data11</td>
         <td>data12</td>
         <td>data13</td>
      </tr>
   </tbody>
</table>


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x


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
