# ProU Task Tracker

A full-stack task management system built with **Vite + React (frontend)** and **Node.js + Express + MySQL (backend)**.  
The app helps manage tasks, track employees, monitor progress, and analyze task status in real time.

This project is deployed end-to-end:

- **Frontend (Netlify):** https://prou-task-tracker.netlify.app  
- **Backend API (Railway):** https://prou-task-tracker-production.up.railway.app  

---

## Features

### Authentication
- Secure login using JWT  
- Protected routes for logged-in users  
- Automatic token injection in API requests  

### Task Management
- Create, read, update, delete (CRUD) tasks  
- Track task status: **Pending, In-Progress, Completed**  
- Assign tasks to employees  
- Due date tracking  

### Employee Management
- Add and view employees  
- Assign tasks per employee  

### Dashboard Insights
- Total tasks  
- Completed / In-Progress / Pending breakdown  
- Real-time updates  

### Fully Responsive UI
- Clean UI built with **Tailwind CSS + DaisyUI**  
- Optimized Vite build  

---

## Tech Stack

### **Frontend**
- React (Vite)
- Axios
- React Router
- Tailwind CSS
- DaisyUI

### **Backend**
- Node.js
- Express.js
- MySQL
- JWT Authentication
- CORS

### **Deployment**
- **Frontend:** Netlify  
- **Backend:** Railway  
- **Database:** Railway MySQL  

---

## Live Demo Links

**Frontend:** https://prou-task-tracker.netlify.app  
**Backend API:** https://prou-task-tracker-production.up.railway.app  
Example API endpoint:  
`GET /api/tasks`

---

## Environment Variables

### **Frontend (`frontend/.env`)**

VITE_API_URL=https://prou-task-tracker-production.up.railway.app


### **Backend (`backend/.env`)**

PORT=4000
DB_HOST=your-host
DB_USER=your-user
DB_PASSWORD=your-password
DB_NAME=your-db
JWT_SECRET=your-secret



---

## Folder Structure

prou-task-tracker/
│
├── backend/
│ ├── src/
│ │ ├── server.js
│ │ ├── routes/
│ │ ├── controllers/
│ │ └── models/
│ ├── package.json
│ └── .env
│
└── frontend/
├── src/
│ ├── pages/
│ ├── components/
│ ├── services/
│ │ └── api.js
│ └── App.jsx
├── public/
├── package.json
└── .env



---

##  API Endpoints Overview

### **Tasks**
| Method | Endpoint              | Description |
|--------|------------------------|-------------|
| GET    | `/api/tasks`          | Get all tasks |
| POST   | `/api/tasks`          | Create task |
| PUT    | `/api/tasks/:id`      | Update task |
| DELETE | `/api/tasks/:id`      | Delete task |

### **Employees**
| Method | Endpoint                | Description |
|--------|--------------------------|-------------|
| GET    | `/api/employees`        | Get employees |
| POST   | `/api/employees`        | Add employee |

---

##  How to Run Locally

### Clone the Repository
```sh
git clone https://github.com/BalaManikanta-Dondapati/prou-task-tracker.git
cd prou-task-tracker
```

##Install Backend
```
cd backend
npm install
npm start
```

Backend runs at:
http://localhost:4000

## Install Frontend
```
cd frontend
npm install
npm run dev
```

Frontend runs at:
http://localhost:5173

## Deployment Notes

### Frontend (Netlify)

- Base Directory: frontend

- Build Command: npm run build

- Publish Directory: frontend/dist

- Environment variable: VITE_API_URL=your backend link

### Backend (Railway)

- Root Directory: /backend

- Start Command: npm start

- Auto-detects Node environment

- MySQL database hosted on Railway

## Screenshots

<img width="1916" height="938" alt="Screenshot 2025-11-28 131137" src="https://github.com/user-attachments/assets/8573d1c1-df0f-4003-ad58-48888c807431" />

<img width="1896" height="928" alt="Screenshot 2025-11-28 131120" src="https://github.com/user-attachments/assets/376632c3-ec0d-4946-99da-ced74df1aca5" />

<img width="1919" height="952" alt="Screenshot 2025-11-28 131047" src="https://github.com/user-attachments/assets/a8aa4ed0-6ac0-4059-9e34-f2db32d2ae09" />

<img width="1896" height="933" alt="Screenshot 2025-11-28 131027" src="https://github.com/user-attachments/assets/b6bd48fe-dc83-44af-9074-e9007e87b2a6" />

<img width="1903" height="935" alt="Screenshot 2025-11-28 131007" src="https://github.com/user-attachments/assets/4347851e-52c2-4d2a-b7a5-a6ed908a8849" />

<img width="1881" height="834" alt="Screenshot 2025-11-28 130941" src="https://github.com/user-attachments/assets/a6139e48-1db9-45a8-97a5-4ab13e94acc2" />

<img width="1915" height="868" alt="Screenshot 2025-11-28 130921" src="https://github.com/user-attachments/assets/d13f2baf-715c-4dd6-a78b-ce81b4a229ac" />

<img width="1876" height="897" alt="Screenshot 2025-11-28 130806" src="https://github.com/user-attachments/assets/660a6534-0303-46e2-9f03-d0b2ed95ffb1" />

## Future Enhancements

- Role-based access (Admin, Manager, Employee)

- Email notifications for due tasks

- Activity logs

- Pagination and advanced filters

- User profile module
