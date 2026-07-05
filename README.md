# TodoList_DoMaiAnh
# 📝 Todo List Application

A full-stack **Todo List** application built with **React**, **Spring Boot**, and **Supabase (PostgreSQL)**. The application helps users efficiently manage daily tasks through an intuitive interface and a RESTful backend.

---

## 🚀 Features

* 📋 Display a list of tasks
* ➕ Add a new task
* ✏️ Edit an existing task
* 🗑️ Delete a task
* ✅ Mark tasks as completed or pending
* 🔍 Search tasks by keyword
* 🎯 Filter tasks by status (All, Completed, Pending)
* 📱 Responsive user interface

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* React Router
* Axios
* Tailwind CSS

### Backend

* Spring Boot
* Spring Data JPA
* Spring Security
* RESTful API
* Maven

### Database

* Supabase (PostgreSQL)

---

## 📂 Project Structure

```text
todo-list/
│
├── backend/                 # Spring Boot Backend
│   ├── src/
│   ├── pom.xml
│   └── ...
│
├── frontend/                # React Frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/todo-list.git
cd todo-list
```

---

### 2. Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Configure the database connection in `application.properties` or `application.yml`.

Example:

```properties
spring.datasource.url=jdbc:postgresql://<SUPABASE_HOST>:5432/postgres
spring.datasource.username=<USERNAME>
spring.datasource.password=<PASSWORD>

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Run the Spring Boot application:

```bash
./mvnw spring-boot:run
```

The backend will run at:

```text
http://localhost:8080
```

---

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

---

## 📡 API Endpoints

| Method | Endpoint                 | Description        |
| ------ | ------------------------ | ------------------ |
| GET    | `/api/todos`             | Get all tasks      |
| GET    | `/api/todos/{id}`        | Get task by ID     |
| POST   | `/api/todos`             | Create a new task  |
| PUT    | `/api/todos/{id}`        | Update a task      |
| DELETE | `/api/todos/{id}`        | Delete a task      |
| PATCH  | `/api/todos/{id}/status` | Update task status |

---

## 🗄️ Database

This project uses **Supabase** as the cloud-hosted PostgreSQL database.

The main table stores information such as:

* Task ID
* Title
* Description
* Status
* Created Date
* Updated Date

---

## 📸 Screenshots

You can add screenshots here after completing the project.

Example:

```
screenshots/
├── home.png
├── add-task.png
├── edit-task.png
└── filter.png
```

---

## 🌐 Deployment

### Frontend

* Vercel

### Backend

* Railway

### Database

* Supabase

---

## 🔮 Future Improvements

* User authentication with JWT
* User registration and login
* Task categories
* Task priorities
* Due dates and reminders
* Dark mode
* Pagination
* Dashboard with statistics
* Drag-and-drop task management

---

## 👨‍💻 Author

Developed as a full-stack learning project using React, Spring Boot, and Supabase.
