# \# VFitDiary

# 

# \### Track. Transform. Become. 💪

# 

# VFitDiary is a full-stack fitness tracking platform designed to help users plan workouts, track training sessions, monitor body composition, visualize progress, and maintain workout streaks.

# 

# The application uses a \*\*React + TypeScript frontend\*\* and a \*\*Spring Boot + Java backend\*\*, with \*\*MySQL\*\* for persistent data storage.

# 

# \---

# 

# \## ✨ Features

# 

# \* 🔐 \*\*Authentication\*\*

# 

# &#x20; \* User registration and login

# &#x20; \* JWT-based authentication

# &#x20; \* Access-token and refresh-token handling

# &#x20; \* Logout functionality

# 

# \* 📊 \*\*Dashboard\*\*

# 

# &#x20; \* Fitness overview

# &#x20; \* Current progress

# &#x20; \* Workout information

# &#x20; \* Streak information

# 

# \* 📏 \*\*Body Assessment\*\*

# 

# &#x20; \* BMI calculation

# &#x20; \* BMR calculation

# &#x20; \* Daily calorie estimation

# &#x20; \* Body-fat percentage assessment

# 

# \* 🏋️ \*\*Workout Generator\*\*

# 

# &#x20; \* Push/Pull/Legs

# &#x20; \* Upper/Lower

# &#x20; \* Full Body

# &#x20; \* Structured workout plans

# 

# \* 📝 \*\*Workout Tracker\*\*

# 

# &#x20; \* Log exercises and sets

# &#x20; \* Track weights and repetitions

# &#x20; \* Automatic 1RM estimation

# &#x20; \* Personal-record tracking

# 

# \* 📈 \*\*Progress Tracking\*\*

# 

# &#x20; \* Weight progress

# &#x20; \* Training volume

# &#x20; \* Personal records

# &#x20; \* Progress charts

# 

# \* 📅 \*\*Workout Calendar\*\*

# 

# &#x20; \* Workout history

# &#x20; \* Monthly calendar

# &#x20; \* Streak tracking

# &#x20; \* Workout heatmap

# 

# \* ⚙️ \*\*User Settings\*\*

# 

# &#x20; \* Profile management

# &#x20; \* Theme settings

# &#x20; \* Account controls

# 

# \* 🛡️ \*\*Secure Backend\*\*

# 

# &#x20; \* Spring Security

# &#x20; \* JWT authentication

# &#x20; \* REST APIs

# &#x20; \* JPA/Hibernate

# &#x20; \* MySQL database

# 

# \---

# 

# \## 🛠️ Tech Stack

# 

# \### Frontend

# 

# \* React 18

# \* TypeScript

# \* Vite

# \* Tailwind CSS

# \* React Router

# \* TanStack Query

# \* React Hook Form

# \* Zod

# \* Chart.js

# \* Framer Motion

# 

# \### Backend

# 

# \* Java 17

# \* Spring Boot 3.3

# \* Spring Security

# \* JWT

# \* Spring Data JPA

# \* Hibernate

# \* Maven

# 

# \### Database

# 

# \* MySQL 8

# 

# \### Development Tools

# 

# \* Git

# \* GitHub

# \* VS Code / IntelliJ IDEA

# \* Postman

# 

# \---

# 

# \## 🏗️ Project Architecture

# 

# ```text

# VFitDiary

# │

# ├── frontend/

# │   ├── src/

# │   ├── public/

# │   ├── package.json

# │   └── vite.config.ts

# │

# ├── backend/

# │   ├── src/

# │   │   ├── main/

# │   │   └── test/

# │   ├── pom.xml

# │   └── README.md

# │

# ├── database/

# │   └── schema.sql

# │

# ├── .gitignore

# └── README.md

# ```

# 

# \---

# 

# \## 🚀 Getting Started

# 

# \### Prerequisites

# 

# Make sure you have the following installed:

# 

# \* Java 17+

# \* Node.js 18+

# \* npm

# \* MySQL 8+

# \* Git

# 

# \---

# 

# \### 1. Clone the repository

# 

# ```bash

# git clone https://github.com/sj79v7jzrw-beep/VFitDiary.git

# cd VFitDiary

# ```

# 

# \---

# 

# \### 2. Set up the database

# 

# Open MySQL and run:

# 

# ```text

# database/schema.sql

# ```

# 

# This creates the VFitDiary database and required tables.

# 

# \---

# 

# \### 3. Configure backend environment variables

# 

# The backend uses environment variables for database credentials and JWT configuration.

# 

# Set:

# 

# ```text

# DB\_USERNAME=your\_mysql\_username

# DB\_PASSWORD=your\_mysql\_password

# JWT\_SECRET=your\_long\_random\_secret

# CORS\_ORIGINS=http://localhost:5173

# ```

# 

# Do not commit real credentials or secrets to GitHub.

# 

# \---

# 

# \### 4. Run the backend

# 

# From the `backend` directory:

# 

# ```bash

# cd backend

# ```

# 

# Then:

# 

# ```bash

# ./mvnw spring-boot:run

# ```

# 

# On Windows, you can use:

# 

# ```cmd

# mvnw.cmd spring-boot:run

# ```

# 

# The backend runs on:

# 

# ```text

# http://localhost:8080

# ```

# 

# \---

# 

# \### 5. Run the frontend

# 

# Open another terminal and run:

# 

# ```bash

# cd frontend

# npm install

# npm run dev

# ```

# 

# The frontend runs on:

# 

# ```text

# http://localhost:5173

# ```

# 

# \---

# 

# \## 🔐 Environment Variables

# 

# For security, sensitive configuration values should be provided through environment variables.

# 

# Example:

# 

# ```text

# DB\_USERNAME=

# DB\_PASSWORD=

# JWT\_SECRET=

# CORS\_ORIGINS=

# ```

# 

# The repository intentionally does not contain real credentials or production secrets.

# 

# \---

# 

# \## 📡 Backend API

# 

# The backend exposes REST APIs for:

# 

# \* Authentication

# \* User profiles

# \* Body assessments

# \* Workout plans

# \* Workout sessions

# \* Progress tracking

# \* Calendar and streaks

# 

# API documentation is available through Swagger/OpenAPI when the backend is running.

# 

# ```text

# http://localhost:8080/swagger-ui.html

# ```

# 

# \---

# 

# \## 📈 Technical Highlights

# 

# \* JWT-based authentication with access and refresh tokens

# \* RESTful backend architecture

# \* Spring Security integration

# \* JPA/Hibernate persistence

# \* MySQL relational database

# \* Type-safe React frontend using TypeScript

# \* Client-side form validation using Zod

# \* Server-state management using TanStack Query

# \* Responsive UI with Tailwind CSS

# \* Chart-based fitness progress visualization

# \* Workout streak and calendar tracking

# \* Automatic 1RM estimation and PR tracking

# \* Loading, empty, and error states throughout the UI

# \* Route-level code splitting using React lazy loading

# 

# \---

# 

# \## 🎯 Project Goals

# 

# VFitDiary was developed to provide a centralized platform for managing fitness data instead of relying on separate notes, spreadsheets, and applications.

# 

# The project focuses on:

# 

# 1\. Workout planning

# 2\. Training-session tracking

# 3\. Body-composition monitoring

# 4\. Progress visualization

# 5\. Fitness consistency through streak tracking

# 

# \---

# 

# \## 🔮 Future Improvements

# 

# \* Deployment to a cloud platform

# \* Email verification and password reset

# \* Advanced analytics

# \* Exercise library with demonstrations

# \* Nutrition and meal tracking

# \* Mobile application

# \* Automated testing and CI/CD

# \* Social/community features

# 

# \---

# 

# \## 👨‍💻 Developer

# 

# \*\*Varun\*\*

# 

# Full-Stack Developer / ECE Student

# 

# GitHub:

# https://github.com/sj79v7jzrw-beep

# 

# \---

# 

# \## 📄 License

# 

# This project is currently intended for educational and portfolio purposes.



