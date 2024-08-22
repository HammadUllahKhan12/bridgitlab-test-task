<!-- omit in toc -->
# Bridgit competency test

Welcome to the Bridgit technical test. There are three tasks of increasing complexity. After you have set up the software complete as many tasks as you can in the allotted timeframe.

| Project  | Description                                |
|----------|--------------------------------------------|
| Database | PostgreSQL managed by Sequelize Migrations |
| Backend  | NodeJS/Typescript with NestJS framework    |
| Frontend | VueJS/Typescript                           |

<!-- omit in toc -->
### Table of contents

- [Setting up](#setting-up)
- [Task - Submit loan application](#task---submit-loan-application)

![Broker portal](broker-portal.png "Broker portal")

## Setting up

Prerequisites: 

- NodeJS 16
- Docker

Setting up the database on `postgres://user:password@localhost:5436/technical_test`:

```bash
# start postgresql server using Docker's "Compose"
$ docker-compose up -d 
# create and populate the database using Sequelize
$ cd database
$ cp .env.localdev .env
$ npm install
$ npm run build
$ npm run migrate
$ npm run seed:all
```

Setting up the backend on `http://localhost:7100` with Swagger on `http://localhost:7100/swagger`:

```bash
$ cd backend
$ cp .env.localdev .env
$ npm install
$ npm run start:dev
```

Setting up the frontend on `http://localhost:7200`:

```bash
$ cd frontend
$ cp .env.localdev .env
$ npm install 
$ npm run start:dev
```

Log in to the frontend as broker 1. You can find the login information in the database seeder script.

## Task - Submit loan application
Implement the following things

  1. Show a modal after clicking the "Submit application" button, and allow the broker to enter the following information and also add     validations on that modal
   
        - applicant_name
        - applicant_email
        - applicant_mobile_phone_number
        - applicant_address
        - annual_income_before_tax
        - incoming_address
        - incoming_deposit
        - incoming_price
        - incoming_stamp_duty
        - loan_amount
        - loan_duration
        - monthly_expenses
        - outgoing_address
        - outgoing_mortgage
        - outgoing_valuation
        - savings_contribution
  
  2. Add a backend endpoint to receive the application submission
  3. Query all existing applications and get the average `loan_amount`
  4. Save the new application to the `applications` table
  5. Return if new loan's loan_amount is above or below the average

Commit your code to your personal git and share the link with us.

## Screenshots

  1. Application Modal
    
  
  2. Saving the application Data in DB


  3. Validations on modal


  

