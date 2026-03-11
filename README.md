# Smart Campus Application

A modern, responsive web application designed for a campus environment. The application features a comprehensive dashboard, campus announcements, event management, academic resources, and user profiles. 

## Features

- **Dashboard**: Overview of user statistics, upcoming schedule, and recent updates.
- **Announcements**: Categorized notices including emergencies, academic updates, and campus life news.
- **Events**: Upcoming campus events with filtering and detail views.
- **Resources**: Centralized hub for academic, library, and student service resources.
- **Profile**: Student information including schedule, grades, and academic standing.
- **Mock Authentication**: Supports role-based login for students and administrators.
- **Modern UI**: Designed with Tailwind CSS, featuring dark mode, animations (Framer Motion), and glassmorphism.

## Tech Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) (via [Vite](https://vitejs.dev/))
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **Server**: Uvicorn

## Project Structure

```
IEEE_COMP/
├── Backend/        # FastAPI backend application
│   └── main.py     # Main API server with mock data and routes
├── frontend/       # React frontend application
│   ├── src/        # Source code (components, pages, styles)
│   ├── public/     # Static assets
│   ├── index.html  # Main HTML entry point
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
└── README.md       # Project documentation
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended for Vite)
- [Python](https://www.python.org/) (v3.8 or higher)

### Backend Setup

1. Open a terminal and navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. (Optional but recommended) Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install the required dependencies:
   ```bash
   pip install fastapi uvicorn pydantic
   ```
4. Start the backend server:
   ```bash
   python main.py
   # Or using uvicorn directly:
   # uvicorn main:app --reload
   ```
   The API will be running at `http://localhost:8000`. You can access the automatic interactive API documentation at `http://localhost:8000/docs`.

### Frontend Setup

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be running at the URL provided by Vite (typically `http://localhost:5173`).

## License
[MIT License](LICENSE)
