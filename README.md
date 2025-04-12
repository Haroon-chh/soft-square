# Activity Manager

A modern task management application built with Vue 3, Pinia, and JSON Server.

## Features

- Create, read, update, and delete activities  
- Filter activities by status (All, Active, Completed)  
- Real-time activity counter  
- Modern UI with Tailwind CSS  
- Persistent data storage with JSON Server  

## Tech Stack

- Vue 3 (Composition API)  
- Pinia for state management  
- Tailwind CSS for styling  
- JSON Server for backend API  
- Vite for development and building  

## Prerequisites

- Node.js (v20 or higher)  
- npm (v7 or higher)  

## Getting Started

### 1. Clone the Repository


### 2. Install Dependencies and Run Frontend

```bash
cd soft-square-assignment
npm install
npm run dev
```

### 3. Run Backend (JSON Server)

Open a new terminal:

```bash
cd soft-square-assignment/backend
npm run api
```

## Project Structure

```
soft-square-assignment/
├── backend/              # JSON Server backend
│   └── db.json           # Mock database
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── stores/           # Pinia stores
│   ├── views/
│   └── App.vue
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## API Endpoints

- `GET /activities` – Fetch all activities  
- `POST /activities` – Create a new activity  
- `PUT /activities/:id` – Update an activity  
- `DELETE /activities/:id` – Delete an activity  

Server runs at: `http://localhost:3000`

## Scripts

### Frontend

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```


