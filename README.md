
# Shipment API

In order to run the API follow the steps below:

Clone this repository to your local workspace

```
npm install
```

### Running DB:
```
docker run --name logix-mysql -e MYSQL_ROOT_PASSWORD=pass123 -p 3306:3306 -d mysql
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
- NodeJS v18.12.1

### Todo:
- Implement more unit and integration tests
- Migration
- Docker
- Improve Logs
- More Middlewares (security etc...)
- Error/Status code handling
- Create Docs (Swagger)
- Remove Organization/Shipment relationship on shipment update