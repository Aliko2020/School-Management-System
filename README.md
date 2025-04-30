# 🎓 School Management System Backend

This is the backend API for a School Management System designed to handle day-to-day operations, built using **Node.js**, **Express**, and **PostgreSQL**. It provides RESTful endpoints for managing students, teachers, users, and announcements.

---

## 🚀 Features

- **CRUD Operations for Students**
- **CRUD Operations for Teachers**
- **User Authentication & Role-Based Access Control**
- **Announcements by Teachers & Admins**

---

## 🛠 Technologies Used

- **Node.js** – JavaScript runtime environment
- **Express.js** – Web framework for Node.js
- **PostgreSQL** – Relational database
- **pg** – PostgreSQL client for Node.js
- **dotenv** – Manage environment variables
- **cors** – Enable cross-origin requests

---

## 🧰 Prerequisites

- **Node.js** (v14+): [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **PostgreSQL** (v12+): [Download](https://www.postgresql.org/download/)

---

## ⚙️ Installation

```bash
git clone https://github.com/Aliko2020/School-Management-System.git
cd backend
npm install
```

---

## ⚙️ Configuration

1. Create a `.env` file in the `backend/` directory:
2. Add your configuration:

```env
PORT=3000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=5432
JWT_SECRET=your_secret_key
```

---

## 📊 Database Schema

Below is a snapshot of the current PostgreSQL tables used in the application:

```sql
sms=# \dt
            List of relations
 Schema |     Name     | Type  |  Owner   
--------+--------------+-------+----------
 public | announcement | table | postgres
 public | class        | table | postgres
 public | fees         | table | postgres
 public | parents      | table | postgres
 public | students     | table | postgres
 public | teachers     | table | postgres
 public | users        | table | postgres
(7 rows)

sms=# 

---

## ▶️ Running the Application

```bash
npm start
```

---

## 📘 API Endpoints

### 🔐 Auth Routes (`/api/users`)

| Method | Endpoint     | Description                      |
|--------|--------------|----------------------------------|
| POST   | `/register`  | Register new user                |
| POST   | `/login`     | Login user (student/teacher/admin) |

---

### 🎓 Student Routes (`/api/students`)

| Method | Endpoint     | Roles Allowed        | Description             |
|--------|--------------|----------------------|-------------------------|
| GET    | `/`          | admin, teacher        | Get all students        |
| GET    | `/:id`       | admin, student        | Get student by ID       |
| POST   | `/`          | admin                 | Create new student      |
| PUT    | `/:id`       | admin                 | Update student by ID    |
| DELETE | `/:id`       | admin                 | Delete student by ID    |

---

### 👨‍🏫 Teacher Routes (`/api/teachers`)

| Method | Endpoint     | Roles Allowed        | Description             |
|--------|--------------|----------------------|-------------------------|
| GET    | `/`          | admin                 | Get all teachers        |
| GET    | `/:id`       | admin, teacher        | Get teacher by ID       |
| POST   | `/`          | admin                 | Create new teacher      |
| DELETE | `/:id`       | admin                 | Delete teacher by ID    |

---

### 📢 Announcement Routes (`/api/announcements`)

| Method | Endpoint     | Roles Allowed                | Description                     |
|--------|--------------|------------------------------|---------------------------------|
| GET    | `/`          | admin, teacher, student, parent | Get all announcements       |
| POST   | `/`          | admin, teacher                | Create new announcement        |
| PUT    | `/:id`       | admin                         | Update announcement by ID      |
| DELETE | `/:id`       | admin, teacher (owner only)   | Delete announcement by ID      |
