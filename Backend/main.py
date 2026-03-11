from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Smart Campus API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with specific origin in production, e.g. ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock Data
DASHBOARD_DATA = {
    "user": {
        "name": "Alex",
        "greeting": "Welcome back, Alex! 👋",
        "message": "You have 2 classes today and 1 new announcement. Your midterm registration starts next week."
    },
    "stats": [
        {"label": "Current GPA", "value": "3.8", "icon_name": "Trophy", "color": "text-amber-500", "bg": "bg-amber-50"},
        {"label": "Credits Earned", "value": "84", "icon_name": "Star", "color": "text-emerald-500", "bg": "bg-emerald-50"},
        {"label": "Upcoming Deadlines", "value": "3", "icon_name": "Clock", "color": "text-rose-500", "bg": "bg-rose-50"},
        {"label": "Library Loans", "value": "2", "icon_name": "BookOpen", "color": "text-blue-500", "bg": "bg-blue-50"},
    ],
    "schedule": [
        {
            "id": 1,
            "time": "10:00 AM - 11:30 AM",
            "title": "Introduction to Computer Science II",
            "location": "Science Building, Room 402",
            "professor": "Prof. Smith",
            "code": "CS 102",
            "color": "indigo"
        },
        {
            "id": 2,
            "time": "2:00 PM - 3:30 PM",
            "title": "Linear Algebra",
            "location": "Math Tower, Room 11B",
            "professor": "Prof. Davis",
            "code": "MATH 201",
            "color": "orange"
        }
    ],
    "recent_updates": [
        {"title": "Campus Wi-Fi Maintenance", "time": "2 hours ago", "urgent": True},
        {"title": "Fall Course Registration Opens", "time": "Yesterday", "urgent": False},
        {"title": "Library Extended Hours", "time": "2 days ago", "urgent": False},
    ]
}

ANNOUNCEMENTS_DATA = [
  {
    "id": 1,
    "title": "Severe Weather Warning: Campus Closing Early",
    "category": "Emergency",
    "icon_name": "ShieldAlert",
    "iconColor": "bg-red-100 text-red-600",
    "date": "Today, 8:00 AM",
    "content": "Due to the incoming winter storm, all afternoon classes (after 2:00 PM) are cancelled today. Campus offices and the library will close at 3:00 PM. Please travel safely.",
    "read": False,
  },
  {
    "id": 2,
    "title": "Action Required: Fall 2026 Registration Opens Next Week",
    "category": "Academic",
    "icon_name": "AlertTriangle",
    "iconColor": "bg-amber-100 text-amber-600",
    "date": "Yesterday, 2:30 PM",
    "content": "Course registration for the Fall semester will begin on Monday, March 16th. Please ensure you have met with your academic advisor and cleared any registration holds before your designated time ticket starts.",
    "read": True,
  },
  {
    "id": 3,
    "title": "New Dining Hall Options Available",
    "category": "Campus Life",
    "icon_name": "Megaphone",
    "iconColor": "bg-emerald-100 text-emerald-600",
    "date": "Mar 7, 2026",
    "content": "We are excited to announce new plant-based stations at the Main Dining Hall and extended weekend hours for the North Campus Cafe.",
    "read": True,
  },
  {
    "id": 4,
    "title": "IT Maintenance: Portal Downtime Sunday Night",
    "category": "IT Services",
    "icon_name": "Bell",
    "iconColor": "bg-blue-100 text-blue-600",
    "date": "Mar 5, 2026",
    "content": "The Student Portal and Blackboard will be unavailable on Sunday from 2:00 AM to 6:00 AM for scheduled maintenance and upgrades.",
    "read": True,
  },
]

EVENTS_DATA = [
  {
    "id": 1,
    "title": "Spring Career Fair 2026",
    "date": "Mar 15",
    "day": "Wednesday",
    "time": "10:00 AM - 4:00 PM",
    "location": "Main Campus Recreation Center",
    "organizer": "Career Services",
    "attendees": 1240,
    "image": "bg-gradient-to-br from-indigo-500 to-cyan-500",
    "tags": ["Career", "Networking"]
  },
  {
    "id": 2,
    "title": "Guest Lecture: AI in Modern Healthcare",
    "date": "Mar 18",
    "day": "Saturday",
    "time": "2:30 PM - 4:00 PM",
    "location": "Science Auditorium 101",
    "organizer": "Computer Science Dept",
    "attendees": 185,
    "image": "bg-gradient-to-br from-blue-600 to-indigo-800",
    "tags": ["Academic", "Tech"]
  },
  {
    "id": 3,
    "title": "Campus Movie Night: Interstellar",
    "date": "Mar 19",
    "day": "Sunday",
    "time": "8:00 PM - 11:00 PM",
    "location": "Student Union Quad",
    "organizer": "Student Activities Board",
    "attendees": 320,
    "image": "bg-gradient-to-br from-slate-800 to-slate-900",
    "tags": ["Social", "Entertainment"]
  },
  {
    "id": 4,
    "title": "Intramural Basketball Championship",
    "date": "Mar 22",
    "day": "Wednesday",
    "time": "7:00 PM - 9:00 PM",
    "location": "Varsity Arena",
    "organizer": "Athletics Dept",
    "attendees": 850,
    "image": "bg-gradient-to-br from-orange-500 to-amber-600",
    "tags": ["Sports", "Campus Life"]
  }
]

RESOURCES_DATA = [
  {
    "category": "Academic Hub",
    "icon_name": "GraduationCap",
    "items": [
      { "name": "Course Catalog 2026-2027", "type": "pdf", "size": "2.4 MB" },
      { "name": "Academic Calendar", "type": "link" },
      { "name": "Study Abroad Guidelines", "type": "doc", "size": "1.1 MB" },
      { "name": "Degree Audit Tool", "type": "link" },
    ]
  },
  {
    "category": "Library & Research",
    "icon_name": "Library",
    "items": [
      { "name": "JSTOR Database Access", "type": "link" },
      { "name": "Citation Style Guide (APA/MLA)", "type": "pdf", "size": "840 KB" },
      { "name": "Interlibrary Loan Request", "type": "link" },
    ]
  },
  {
    "category": "Student Services",
    "icon_name": "Folder",
    "items": [
      { "name": "Health Center Information", "type": "doc", "size": "450 KB" },
      { "name": "Housing Portal", "type": "link" },
      { "name": "Financial Aid Forms", "type": "folder", "count": 12 },
      { "name": "Career Services Resume Templates", "type": "folder", "count": 5 },
    ]
  }
]

PROFILE_DATA = {
    "user_info": {
        "name": "Alex Johnson",
        "avatar": "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        "major": "Computer Science, B.S.",
        "id": "90034211",
        "year": "Junior Year",
        "email": "a.johnson@university.edu",
        "phone": "+1 (555) 123-4567",
        "housing": "North Campus Res, Room 402"
    },
    "semester": {
        "term": "Current Semester",
        "status": "Enrolled",
        "total_credits": 13,
        "classes": [
            { "course": "CS 301", "name": "Data Structures and Algorithms", "credits": 4, "type": "Core", "grade": "A-" },
            { "course": "CS 350", "name": "Software Engineering", "credits": 3, "type": "Core", "grade": "A" },
            { "course": "MATH 220", "name": "Discrete Mathematics", "credits": 3, "type": "Core", "grade": "B+" },
            { "course": "ENG 205", "name": "Technical Writing", "credits": 3, "type": "Elective", "grade": "A" },
        ]
    }
}

# --- Auth Schemas ---

class LoginRequest(BaseModel):
    username: str
    password: str

# --- Routes ---

@app.post("/api/auth/student")
def student_login(request: LoginRequest):
    # Mock validation: accept any password for valid format
    if not request.username or not request.password:
         raise HTTPException(status_code=400, detail="Missing credentials")
         
    return {"status": "success", "token": "mock_student_token_123", "role": "student"}

@app.post("/api/auth/admin")
def admin_login(request: LoginRequest):
    # Mock validation: accept any password for valid format
    if not request.username or not request.password:
         raise HTTPException(status_code=400, detail="Missing credentials")
         
    return {"status": "success", "token": "mock_admin_token_456", "role": "admin"}

@app.get("/api/dashboard")
def get_dashboard():
    return DASHBOARD_DATA

@app.get("/api/announcements")
def get_announcements():
    return ANNOUNCEMENTS_DATA

@app.get("/api/events")
def get_events():
    return EVENTS_DATA

@app.get("/api/resources")
def get_resources():
    return RESOURCES_DATA

@app.get("/api/profile")
def get_profile():
    return PROFILE_DATA

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
