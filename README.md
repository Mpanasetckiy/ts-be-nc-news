# Northcoders News API TypeScript

It is the API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as Reddit) which should provide this information to the front end architecture

## Table of Contents

1. [Installation](#installation)
2. [Testing](#testing)
3. [Usage](#usage)

## Installation

To set up the local environment, follow these steps:

1. Clone the repository from GitHub:

   ```
   git clone https://github.com/Mpanasetckiy/ts-be-nc-news.git
   ```

2. You will need to create `.env` files for your project: `.env.test`, `.env.development` and `.env.production`. Into first two, add `PGDATABASE=`, with the correct local database name for that environment (see /db/setup.sql for the database names). For the production file add `DATABASE_URL= `with the connection string given from Supabase. Double check that these `.env` files are `.gitignored`.

3. You'll need to run npm install at this point.

   ```
   npm install
   ```

4. You'll need to create dev database and test database running the following command:

   ```
   npm run setup-dbs
   ```

5. After installing dependencies and creating the databases, you'll need to seed db with the following command:

   ```
   npm run seed
   ```

6. In order to run ts server type following command:

   ```
   npm run start-dev
   ```

## Testing

### Prerequisites

- Familiarise yourself with the available endpoints and their parameters.
- Make sure you have installed all dependencies.
- Make sure you have PSQL database active and running OR remote database URL is provided.

### Manual Testing

- Manual testing is available using tools like Postman or Insomnia via sending HTTP requests to the API endpoints.
- Integrations tests are provided with predefined inputs and verify the expected outputs.

Available via the following command:

```
npm run test
```

## Requirements

Ensure that your system meets the following requirements to use the API:

- **Node.js**: Version 20.x or higher installed on your machine.
- **Database**: Version 16.x or higher installed on your machine.

## Usage

### Base URL

This URL is for accessing the NEWS API:

https://ts-be-nc-news-jsmapzdgsq-nw.a.run.app

### Endpoints

For detailed information on available endpoints and their outcome, refer to the [OPEN API Endpoints Documentation](https://ts-be-nc-news-jsmapzdgsq-nw.a.run.app/api-docs/).
