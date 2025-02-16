# 🛠️ Task Management App created using MERN Stack

## 🚀 Live Demo

- **Frontend:** [frontend.vercel.app](https://task-management-app-frontend-two.vercel.app/)
- **Backend:** [backend.onrender.com](https://task-management-app-backend-hs0r.onrender.com/tasks)

## 🌟 Features

- CRUD operations (Create, Read, Update, Delete)
- Responsive UI
- API integration with backend

## 🛠️ Tech Stack

- **Frontend:** React, Axios
- **Backend:** Node.js, Express.js, MongoDB
- **Database:** MongoDB Atlas
- **Deployment:** Render (backend), Vercel (frontend)

## 🏗️ Installation & Setup

### 1️⃣ Clone the repository

```bash

git clone https://github.com/yogeshwera96/Task-Management-App

```

## Backend Setup

```bash

cd backend
npm install
npm run dev

```

### Create a .env file inside backend/ and add:

MONGO_URI = mongodb+srv://yogeshwera1996:task1234@cluster0.0xgj4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT = 3001

## Frontend Setup

```bash

cd frontend
npm install
npm start

```

## 🛠️ API Endpoints

| Method | Endpoint                          | Description                  |
| ------ | --------------------------------- | ---------------------------- |
| GET    | `/tasks`                          | Get all tasks                |
| POST   | `/tasks`                          | Create a new task            |
| GET    | `/tasks?status=pending/completed` | Filter tasks based on status |
| DELETE | `/tasks/:id`                      | Delete a task                |
| PATCH  | `/tasks/:id`                      | Mark a task as completed     |
