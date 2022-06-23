# iCakes

A personal project that allows users to register recipes and calculate the selling price of cakes and sweets.

## Requirements
Docker
## Installation

First of all, define the application  .env file at the root folder using the .env.example as example, then add the following variables to set up your database environment

```
DB_CONNECTION=mysql
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DB_NAME=icakes
```
After, run the following scripts at yout terminal:
```Bash
npm install

docker compose up -d 

node ace migration:run - To create all database tables

node ace db:seed - To create first user with Admin role

npm run dev
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
