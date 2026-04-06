# LookJobs - Job & Internship Search + Application Tracker

Production-ready full-stack app for searching jobs/internships and tracking applications.

## Tech Stack
- Frontend: React (Vite), JavaScript, Tailwind CSS
- Backend: Java 17, Spring Boot, Spring MVC, Spring Data JPA, Hibernate, Spring Security + JWT
- Database: PostgreSQL

## Folder Structure
```text
LookJobs/
  backend/
    pom.xml
    src/main/java/com/lookjobs/
      config/
      controller/
      dto/
      entity/
      exception/
      repository/
      security/
      service/
    src/main/resources/application.yml
  frontend/
    package.json
    src/
      api/
      components/
      context/
      pages/
```

## Features
- Job/internship search with role, location, and experience filters
- Save jobs for later
- Search history
- Application CRUD (Applied / Interview / Offer / Rejected)
- Dashboard metrics (total, interviews, offers, rejections)
- User auth (register/login) with JWT
- User-scoped data isolation
- Daily scheduler job for job digest refresh
- Responsive mobile + desktop UI

## Backend Setup
1. Create PostgreSQL DB: `lookjobs`
2. Copy `backend/.env.example` values into environment variables
3. Run:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

Backend API runs on `http://localhost:8080`.

## Frontend Setup
1. Configure `frontend/.env.example` as `.env`
2. Run:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

Frontend runs on `http://localhost:5173`.

## Important API Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/jobs/search`
- `GET /api/jobs/history`
- `GET /api/jobs/daily-digest`
- `GET/POST/PUT/DELETE /api/applications`
- `GET/POST/DELETE /api/saved-jobs`
- `GET /api/dashboard`

## Production Notes
- Use a strong `JWT_SECRET` (>= 32 chars)
- Set `spring.jpa.hibernate.ddl-auto=validate` in hardened environments
- Restrict `CORS_ORIGIN` to trusted frontend URL
- Run backend/frontend behind reverse proxy (Nginx) with HTTPS
