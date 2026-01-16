# ezyZip - Job Application Tracker

A modern, full-stack job application tracking system that helps you organize and manage your job search. Track applications across different stages, visualize your progress with a Kanban board, and never lose track of where you applied.

![Dashboard Screenshot](screenshots/dashboard.png)

## Features

- **Dashboard Overview** - View statistics for all your applications at a glance
- **Multiple Views** - Switch between List view and Kanban board
- **Drag & Drop Kanban** - Easily move applications between status columns
- **Advanced Filtering** - Filter by status (Applied, Interview, Offer, Rejected)
- **Search** - Find applications by company name or role
- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Works on desktop and mobile devices

## Screenshots

### Dashboard View
![Dashboard](screenshots/dashboard.png)
*Overview of all your job applications with statistics*

### Kanban Board
![Kanban Board](screenshots/kanban.png)
*Drag and drop applications between status columns*

### Add Application
![Add Application](screenshots/add-application.png)
*Easily add new job applications*

### Dark Mode
![Dark Mode](screenshots/dark-mode.png)
*Full dark mode support*

> **Note:** Add your own screenshots to the `screenshots/` folder

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Zod** for validation

### Frontend
- **React 19** with Vite
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **Radix UI** components
- **Framer Motion** for animations
- **@dnd-kit** for drag and drop

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas cloud)
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ezyZip.git
cd ezyZip
```

### 2. Backend Setup

```bash
cd ezy/Backend
npm install
```

Create a `.env` file in the Backend directory:

```env
MONGO_URI=mongodb+srv://your-username:your-password@cluster0.mongodb.net/ezyzip
JWT_SECRET=your-super-secret-jwt-key
PORT=5001
```

Start the backend server:

```bash
npm run dev
```

The API will be running at `http://localhost:5001`

### 3. Frontend Setup

Open a new terminal:

```bash
cd ezy/Frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The app will be running at `http://localhost:5173`

## Usage

### 1. Register/Login

Create a new account or login with existing credentials.

### 2. Add Applications

Click the "Add Application" button and fill in:
- **Company Name** - The company you applied to
- **Role** - The job title/position
- **Status** - Current application status
- **Applied Date** - When you submitted the application

### 3. Track Progress

- Use the **status filter buttons** to view applications by stage
- Use the **search bar** to find specific companies or roles
- Toggle between **List** and **Kanban** views

### 4. Update Status

**List View:** Click the edit button on any application card

**Kanban View:** Drag and drop cards between columns:
- Applied → Interview → Offer/Rejected

### Status Colors

| Status | Color |
|--------|-------|
| Applied | Blue |
| Interview | Yellow |
| Offer | Green |
| Rejected | Red |

## API Reference

All endpoints require authentication (JWT token in cookies).

### Applications

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tracker` | Get all applications |
| `POST` | `/api/tracker` | Create new application |
| `GET` | `/api/tracker/:id` | Get single application |
| `PUT` | `/api/tracker/:id` | Update application |
| `DELETE` | `/api/tracker/:id` | Delete application |

### Query Parameters

```
GET /api/tracker?status=Interview&search=Google&page=1&limit=10
```

| Parameter | Description |
|-----------|-------------|
| `status` | Filter by status |
| `search` | Search company/role |
| `page` | Page number |
| `limit` | Items per page |

## Project Structure

```
ezyZip/
├── ezy/
│   ├── Backend/
│   │   ├── controllers/      # Request handlers
│   │   ├── models/           # MongoDB schemas
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Auth middleware
│   │   ├── utils/            # Database connection
│   │   └── index.js          # Express app
│   │
│   └── Frontend/
│       ├── src/
│       │   ├── components/   # React components
│       │   │   ├── tracker/  # Tracker-specific components
│       │   │   ├── ui/       # Reusable UI components
│       │   │   └── ...
│       │   ├── redux/        # State management
│       │   ├── hooks/        # Custom hooks
│       │   └── App.jsx       # Main app
│       └── ...
│
├── screenshots/              # App screenshots
└── README.md
```

## Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secret-key` |
| `PORT` | Server port | `5001` |

## Troubleshooting

### CORS Errors

Ensure the backend CORS configuration matches your frontend URL:
```javascript
// Backend index.js
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### MongoDB Connection Failed

1. Check your `MONGO_URI` is correct
2. Ensure your IP is whitelisted in MongoDB Atlas
3. Verify your database user credentials

### JWT Token Issues

1. Clear browser cookies
2. Try logging in again
3. Check `JWT_SECRET` is set in `.env`

## Scripts

### Backend

```bash
npm run dev      # Start development server
npm start        # Start production server
```

### Frontend

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

---

Made with React, Node.js, and MongoDB
