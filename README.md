## Random Data Generator

This generates [random](faker.js) objects with dealer information.
The generated data is similar to the one in result.json.

### Running the Generator
```
npm install
npm run start
```

This reaches out to [mlab](mlab.com) for the database connection. The server.js file expects a `config.json` with the follwing info:
```
{
    "username": <Your Username Here>,
    "password": <Your Password Here>
}
```
where username and password are your database credentials.

