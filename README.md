# Elvora Suites - Hotel Management System

A hotel management system built with Spring Boot (backend) and Angular (frontend).

## Features
- Room management (CRUD, status tracking)
- Guest management (CRUD, search)
- Booking management (create, check-in, check-out, cancel)
- Dashboard with live stats
- Room availability checking

## Quick Start

### Backend
```bash
cd backend
./mvnw spring-boot:run
```
Runs on http://localhost:8080
H2 Console: http://localhost:8080/h2-console (JDBC URL: `jdbc:h2:mem:elvoradb`)

### Frontend
```bash
cd frontend
npm install
npm start
```
Runs on http://localhost:4200

## Project Structure
- `backend/` - Spring Boot 3 REST API with JPA + H2
- `frontend/` - Angular 17 SPA with Angular Material
