ResumeRadar is an AI-enhanced resume parsing and scoring system built with Node.js, TypeScript, and MongoDB. It allows recruiters and internal HR teams to upload resumes (PDF), extract structured information using Regex, detect duplicates, and score candidates based on required job skills. Future enhancements include smart job-role recommendations and AI-driven skill gap analysis — making the hiring process faster and more accurate.

Future plans include smart job-role matching and AI-driven skill gap analysis — making the hiring process faster and more accurate and aslo using UI/Frontend React (coming soon).


## 🔧 Features
- 📄 Upload and parse resumes (PDF)
- 🧠 Extract structured data using Regex
- 🛡️ Admin JWT authentication
- 🔁 Duplicate resume detection
- 📊 Resume scoring system
- 🧠 Smart AI Skill Gap Analysis (coming soon)
- 💼 Job-role matching (coming soon)

## 🛠️ Tech Stack
- Backend: Node.js, Express.js, TypeScript
- Database: MongoDB + Mongoose
- File Uploads: Multer
- PDF Parsing: pdf-parse
- Auth: bcrypt, JWT

### 🔌 API Endpoints

- POST /upload  
  Upload a PDF resume file for parsing and saving.

### 🔍 Admin Authentication
- POST /admin/login  
  Login route for admin using JWT.

### 📋 Resume Management
- GET /resumes  
  Fetch all uploaded resumes.

- GET /resumes/:id  
  Fetch a single resume by ID.

### 🧠 Resume Analysis
- GET /resumes/:id/score  
  Get resume score based on skill match (planned).

- GET /resumes/:id/gap-analysis  
  AI-based skill gap analysis (coming soon).

### 🎯 Job Matching
- GET /resumes/:id/match-job  
  Smart job-role matching (coming soon).

  ## Frontend 
  -React (coming soon).

  ## Folder Structre

  resumerader/
├── src/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   │   ├── adminRoutes.ts
│   │   ├── jobRoutes.ts
│   │   └── resumeRoutes.ts
│   ├── services/
│   ├── utils/
│   ├── validators/
│   └── index.ts
├── uploads/
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md


## 📸 Demo & Screenshots (Coming Soon)

---

## 🙌 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

MIT © Vivek