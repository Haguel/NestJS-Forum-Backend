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
   git clone https://github.com/your-username/nestjs-forum.git

2. Install dependencies
   ```bash
    cd nestjs-forum-backend
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

4. Start the development server
   ```bash
   npm run start:dev

## Libraries I used
- ![nestjs/config](https://img.shields.io/badge/nestjs%2Fconfig-yellowgreen?style=flat) for env.
- ![cross-env](https://img.shields.io/badge/cross--env-brightgreen?style=flat) for starting with different env files in different modes
- ![nestjs/jwt](https://img.shields.io/badge/nestjs%2Fjwt-red?style=flat) for jwt
- ![bcrypt](https://img.shields.io/badge/bcrypt-orange?style=flat) for crypting passwords
- ![class-transformer](https://img.shields.io/badge/class--transformer-yellow?style=flat) ![class-validator](https://img.shields.io/badge/class--validator-brightgreen?style=flat) for data validations
- ![pg](https://img.shields.io/badge/pg-lightblue?style=flat) ![pg-hstore](https://img.shields.io/badge/pg--hstore-blueviolet?style=flat) drivers for PostgreSQL
- ![nestjs/swagger](https://img.shields.io/badge/nestjs%2Fswagger-red?style=flat) for api documentation
- ![nestjs/sequelize](https://img.shields.io/badge/nestjs%2Fsequelize-blue?style=flat) ![sequelize](https://img.shields.io/badge/sequelize-blue?style=flat) ![sequelize-typescript](https://img.shields.io/badge/sequelize--typescript-blueviolet?style=flat) ![@types/sequelize](https://img.shields.io/badge/%40types%2Fsequelize-lightblue?style=flat) for sequelize and sequelize-typescript

