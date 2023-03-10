
# Shipment API

## Instructions: 

Clone this repository into your local workspace and run the following commands:

```
$ npm install
```

### Running DB:
```
$ docker run --name logix-mysql -e MYSQL_ROOT_PASSWORD=pass123 -p 3306:3306 -d mysql
```
### Create Database and Tables

```
$ docker exec -it logix-mysql bash
$ mysql -p //type the password pass123

// Copy the content of ./src/db/migration.sql and paste into mysql cli
// Execute it

```

### Run the app:
```
$ source .env.local
$ npm start
```


### Versions
- NPM 9.2.0
- NodeJS v16.14.1

### Todo:
- Request validations
- Implement more unit and integration tests
- Migration
- Docker
- Improve Logs
- More Middlewares (security etc...)
- Error/Status code handling
- Create Docs (Swagger)
- Remove Organization/Shipment relationship on shipment update