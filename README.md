
# 🎟️ Event Management REST API

A RESTful API for managing events and user registrations, built using **Node.js**, **Express**, and **PostgreSQL** using aiven(cloud platform).

## 🚀 Features

- Create and manage events
- User registration and cancellation
- Capacity limits, registration validation
- View event stats
- List upcoming events (sorted by date and location)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/UttamKrDEV17/event_management
cd EventManagement
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
DB_USER=your_postgres_user
DB_HOST=your_postgres_host
DB_DATABASE=your_db_name
DB_PASSWORD=your_password
DB_PORT=your_postgres_port
```

> ℹ️ For Aiven, use the credentials from your Aiven PostgreSQL service.

### 4. Initialize the Database

Use the `sql/init.sql` script or run the provided `initDb()` function once in your backend to create tables:

```bash
psql -h <HOST> -U <USER> -d <DB_NAME> -f sql/init.sql
```

### 5. Start the Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`

---

## 📘 API Description

### 📁 User Routes

| Method | Endpoint             | Description        |
|--------|----------------------|--------------------|
| POST   | `/api/users`         | Create a new user  |
| GET    | `/api/users/:id`     | Get user by ID     |

### 📁 Event Routes

| Method | Endpoint                             | Description                       |
|--------|--------------------------------------|-----------------------------------|
| POST   | `/api/events`                        | Create a new event                |
| GET    | `/api/events/:id`                    | Get event details + registrations |
| POST   | `/api/events/:id/register`           | Register a user to event          |
| DELETE | `/api/events/:id/cancel/:userId`     | Cancel user registration          |
| GET    | `/api/events/upcoming/list`          | List future events (sorted)       |
| GET    | `/api/events/:id/stats`              | Get stats (total, remaining, %)   |

---

## 💬 Example Requests & Responses

### ✅ Create User

**Request:**

```http
POST /api/users
Content-Type: application/json

{
  "name": "Alice",
  "email": "alice@example.com"
}
```

**Response:**

```json
{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com"
}
```

---

### ✅ Create Event

```http
POST /api/events
Content-Type: application/json

{
  "title": "Tech Conference",
  "datetime": "2025-07-30T10:00:00Z",
  "location": "Delhi",
  "capacity": 200
}
```

**Response:**

```json
{
  "id": 1
}
```

---

### ✅ Register for Event

```http
POST /api/events/1/register
Content-Type: application/json

{
  "userId": 1
}
```

**Response:**

```json
{
  "message": "Registration successful"
}
```

---

### ❌ Register Again (Already Registered)

```json
{
  "error": "User already registered"
}
```

---

### ✅ Cancel Registration

```http
DELETE /api/events/1/cancel/1
```

**Response:**

```json
{
  "message": "Registration cancelled"
}
```

---

### ✅ Get Event Stats

```http
GET /api/events/1/stats
```

**Response:**

```json
{
  "totalRegistrations": 1,
  "remainingCapacity": 199,
  "percentageUsed": "0.50"
}
```

---

## 📦 Postman Collection

[Download Here](https://drive.google.com/file/d/1neuHI_Q_-tiBeDsIRJgiPIutyc2B-GuP/view?usp=sharing)

---

## 🛠 Tech Stack

- **Node.js** + **Express**
- **PostgreSQL** (hosted on Aiven)
- **pg** (PostgreSQL driver)
- **dotenv**

---

## 📄 License

MIT License – Free to use and modify.
