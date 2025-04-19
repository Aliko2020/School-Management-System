# School Management System Backend

This is the backend API for a School Management System designed to handle day-to-day operations, built using Node.js, Express, and PostgreSQL. It provides RESTful endpoints for managing student, teacher, and user data.

## Features

* **CRUD Operations for Students:**
    * Read, Update, and Delete student records.
* **CRUD Operations for Teachers:**
    * Create, Read, Update, and Delete teacher records.
* **User Management (Planned/Implemented):**
    * Create, Read, Update, and Delete user accounts.
    * Authentication and Authorization.

## Technologies Used

* **Node.js:** JavaScript runtime environment for server-side development.
* **Express.js:** Minimalist web application framework for Node.js.
* **PostgreSQL:** Relational database management system.
* **`pg` (or `pg-pool`):** Node.js client for PostgreSQL to interact with the database.
* **`dotenv`:** Module to load environment variables from a `.env` file.
* **`cors`:** Middleware to enable Cross-Origin Resource Sharing.

## Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js:** (version >= 14.0.0 recommended) - [Download Node.js](https://nodejs.org/)
* **npm** (Node Package Manager) - usually installed with Node.js
* **PostgreSQL:** (version >= 12 recommended) - [Download PostgreSQL](https://www.postgresql.org/download/)

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Aliko2020/School-Management-System.git
    cd backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

## Configuration

1.  **Create a `.env` file:**

    In the root directory of the project, create a file named `.env`.

2.  **Configure environment variables:**

    Open the `.env` file and add your PostgreSQL database connection details and the server port. Replace the placeholder values with your actual credentials:

    ```dotenv
    PORT=3000
    DB_HOST=localhost
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=your_db_name
    DB_PORT=5432
    ```
3.  **Database Setup:**

    Ensure that the database specified in your `.env` file (`sms`) exists in your PostgreSQL server. You might need to create it and potentially run migrations or seed data to set up the initial schema.

## Running the Application

To start the backend server, run the following command in your project directory:

```bash
npm run dev
