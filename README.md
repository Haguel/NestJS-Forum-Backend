![NestJS Logo](https://nestjs.com/img/logo_text.svg) 
# NestJS backend for a forum

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Description
Here is my NestJS pet project. It provides a platform for users to make/edit/remove and like posts. Additionally there is logic for admins and moderators to manage complaints or just mute and ban users.

## Features
- User authentication and authorization
- Create, read, update, and remove posts
- Create, read, remove complaints
- Liking system for posts
- User roles and permissions
- Moderation and administration tools
- Swagger documentation
- PostgreSQL as database

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/TsugaruBurst/NestJS-Forum-Backend.git

2. Install dependencies
   ```bash
    cd NestJS-Forum-Backend
    npm install

3. Setup test.env file
   ```bash
    PORT=3000
    DB_HOST=localhost
    DB_PORT=5432
    DB_PASSWORD=root
    DB_USERNAME=postgres
    DB_NAME=nest_forum_backend
    SALT_ROUNDS=6
    JWT_SECRET=secret

4. Start the test server
   ```bash
   npm run start:test

5. Run prepared seeder in order to get needed data to test (it creates needed roles and an admin)
   ```bash
   npm run db:seed:test
> **Attention:** Do not run seeder before the first initializtion of the app. Run the server first in order to init all the needed tables in the database

## Libraries I used
- ![nestjs-config](https://img.shields.io/badge/%40nestjs%2Fconfig-configuration-%23E0234E) ![dotenv](https://img.shields.io/badge/dotenv-configuration-%23E0234E) ![cross-env](https://img.shields.io/badge/cross--env-environment-%23E0234E)
- ![nestjs-jwt](https://img.shields.io/badge/%40nestjs%2Fjwt-authentication-%236DB33F)
- ![bcrypt](https://img.shields.io/badge/bcrypt-hashing-%2346BC99)
- ![class-transformer](https://img.shields.io/badge/class--transformer-data--transformator-%239E7EFC) ![class-validator](https://img.shields.io/badge/class--validator-data--validation-%239E7EFC)
- ![pg](https://img.shields.io/badge/pg-database--driver-%23047AED) ![pg-hstore](https://img.shields.io/badge/pg--hstore-database--driver-%23047AED)
- ![nestjs-swagger](https://img.shields.io/badge/%40nestjs%2Fswagger-api--documentation-%23F8941D)
- ![nestjs-sequelize](https://img.shields.io/badge/%40nestjs%2Fsequelize-database--orm-%237991A8) ![sequelize](https://img.shields.io/badge/sequelize-database--orm-%237991A8) ![sequelize-typescript](https://img.shields.io/badge/sequelize--typescript-database--orm-%237991A8) ![types-sequelize](https://img.shields.io/badge/%40types%2Fsequelize-database--orm--types-%237991A8)
- ![sequelize-cli](https://img.shields.io/badge/%40sequelize%2Fcli-db--cli-%CC397BFF)

