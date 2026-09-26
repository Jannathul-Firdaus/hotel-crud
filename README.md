# Hotel CRUD — Full-Stack Hotel Management Application

A full-stack hotel management application that allows users to add, view, search, filter, edit, and delete hotel listings with persistent PostgreSQL database storage.

## ✨ Features

* Add new hotel listings with image upload and preview
* Edit existing hotel details
* Delete hotel listings
* Search hotels by title
* Filter hotels by minimum and maximum price
* Pagination for hotel listings
* Responsive card-based hotel listing UI
* Detailed hotel information page
* Interactive map using hotel latitude and longitude
* Browser geolocation support
* Form validation
* Success and error notifications
* RESTful CRUD APIs
* PostgreSQL database persistence
* Redux Toolkit for state management
* SEO metadata using React Helmet

## 🛠️ Tech Stack

### Frontend

* React.js
* Redux Toolkit
* React Router
* React Leaflet
* HTML5
* CSS3
* Vite

### Backend

* Node.js
* Express.js
* PostgreSQL
* Multer
* REST API

### Development Tools

* Git & GitHub
* VS Code
* Postman

## 📁 Project Structure

```text
hotel-crud/
├── backend/
│   ├── routes/
│   ├── uploads/
│   ├── .env.example
│   ├── db.js
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   ├── Pages/
│   │   └── Redux/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## 🔄 Application Flow

```text
User
  ↓
React Frontend
  ↓
Redux Toolkit
  ↓
Express REST API
  ↓
PostgreSQL Database
```

Hotel images are uploaded through the backend using Multer and served from the `/uploads` directory.

## 🔌 API Endpoints

| Method | Endpoint          | Description    |
| ------ | ----------------- | -------------- |
| GET    | `/api/hotels`     | Get all hotels |
| POST   | `/api/hotels`     | Create a hotel |
| PUT    | `/api/hotels/:id` | Update a hotel |
| DELETE | `/api/hotels/:id` | Delete a hotel |

## 🗄️ Database

The application uses **PostgreSQL** for persistent hotel data storage.

Hotel records include:

* Title
* Description
* Image
* Latitude
* Longitude
* Price

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Jannathul-Firdaus/hotel-crud.git
cd hotel-crud
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file based on `.env.example` and configure your PostgreSQL database credentials.

Start the backend:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## 🖥️ Main Pages

### Hotel Listing

Displays hotel cards with:

* Search
* Price filters
* Pagination
* Edit
* Delete

### Add / Edit Hotel

Reusable form for creating and updating hotel listings with image preview and validation.

### Hotel Details

Displays complete hotel information along with an interactive map based on the hotel's coordinates.

## 🔐 Environment Variables

The backend uses environment variables for database configuration.

Example:

```env
PORT=5000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=hotel_db
DB_PASSWORD=your_password
DB_PORT=5432
```

> The actual `.env` file is excluded from Git using `.gitignore`.

## 📌 Future Improvements

* User authentication and authorization
* Cloud image storage
* Advanced hotel sorting
* Booking functionality
* Deployment with a production database
* Improved API error handling

## 👩‍💻 Author

**Jannathul Firdaus Z**

Computer Science & Engineering Student

GitHub: https://github.com/Jannathul-Firdaus
