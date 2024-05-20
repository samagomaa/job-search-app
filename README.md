# Job Search App

Job Search App is a backend project implemented using Node.js and Mongoose that allows users to manage their accounts, search for jobs, and apply for jobs. It provides CRUD operations for users, jobs, and companies, with additional features for error handling, authentication, and more.

## Features

- **User CRUD Operations**: Delete account, Sign in, Sign up, Update account, Get owner data, Get profile data for another user, Update password, and Get all accounts associated with a specific recovery email.
- **Job CRUD Operations**: Add job, Update job, Delete job, Get all jobs, Get job for a company, Job filter, Apply for a job, and Get all applications.
- **Company CRUD Operations**: Add company, Update company, Delete company, Get company profile, and Search for a company.
- **Authentication**: User authentication using `jsonwebtoken`.
- **Authorization**: Role-based access control for different API endpoints.
- **Password Hashing**: Secure password storage using `bcrypt`.
- **Middleware**: Implemented custom middleware for authentication, authorization, and error handling.
- **Environment Variables**: Configuration using `dotenv`.
- **File Upload**: Support for uploading files using `multer`.
- **Validation**: Input validation to ensure data integrity.
- **Advanced API Features**: Pagination, filtering, sorting, and field selection for job listings.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- jsonwebtoken
- dotenv
- multer

## Methods Practiced

- **CRUD Operations**: Implemented Create, Read, Update, and Delete operations for users, jobs, and companies.
- **Mongoose Models**: Defined and used Mongoose schemas and models to interact with MongoDB.
- **RESTful API Design**: Designed RESTful endpoints for managing users, jobs, and companies.
- **Error Handling**: Implemented middleware to handle errors gracefully.
- **Authentication and Authorization**: Used `jsonwebtoken` for secure user authentication and role-based access control.
- **Password Hashing**: Used `bcrypt` to hash user passwords.
- **File Upload**: Implemented file upload functionality using `multer`.
- **Validation**: Ensured data integrity with input validation.
- **Advanced API Features**: Implemented pagination, filtering, sorting, and field selection for job listings.
- **Configuration Management**: Managed configuration using `dotenv`.

## What I Learned

- **Backend Development**: Gained hands-on experience with backend development using Node.js and Express.
- **Database Management**: Learned how to interact with MongoDB using Mongoose for data storage and retrieval.
- **API Design**: Understood the principles of designing RESTful APIs.
- **Security Best Practices**: Implemented secure password hashing with `bcrypt` and token-based authentication with `jsonwebtoken`.
- **Authorization**: Implemented role-based access control for different API endpoints.
- **Middleware**: Developed custom middleware for handling authentication, authorization, and errors.
- **Configuration Management**: Utilized `dotenv` for environment variable management.
- **File Handling**: Managed file uploads using `multer`.
- **Advanced API Features**: Implemented pagination, filtering, sorting, and field selection for job listings.
- **Validation**: Ensured data integrity through robust validation mechanisms.
