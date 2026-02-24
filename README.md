# Book Courier

Project Name:  BookCourier – Library-to-Home Delivery System

Project Overview & Discussion
BookCourier is a library delivery management system where users can request book pickup or delivery from their nearby libraries. The system helps students, researchers, and readers borrow and return books without physically visiting the library.


🔗 **Live Client:** https://book-courier365.netlify.app/
🔗 **Live Server:** https://book-courier-server-khaki.vercel.app/

------------------------------------------------------------------------

##  Technologies Used

### Frontend

-   React 19
-   React Router 7
-   React Hook Form
-   TanStack React Query
-   Axios
-   Tailwind CSS 4
-   DaisyUI
-   Headless UI
-   SweetAlert2
-   Swiper
-   React Leaflet
-   Firebase

### Backend

-   Express 5
-   MongoDB
-   NanoID
-   Stripe
-   CORS
-   Dotenv

------------------------------------------------------------------------

## 📦 Installation Guide

### 1️⃣ Clone Repository

``` bash
git clone https://github.com/getSohelRana/book-courier-client
cd book-courier
```

------------------------------------------------------------------------

### 2️⃣ Setup Frontend

``` bash
cd client
npm install
```

Create `.env` file:

    VITE_API_URL=https://book-courier-server-khaki.vercel.app/

Run frontend:

``` bash
npm run dev
```

------------------------------------------------------------------------

### 3️⃣ Setup Backend

``` bash
cd server
npm install
```

Create `.env` file:

    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    STRIPE_SECRET_KEY=your_stripe_secret_key

Run backend:

``` bash
npm run start
```

------------------------------------------------------------------------

## ✨ Features

-   User Authentication
-   Courier Booking System
-   Admin Dashboard
-   Librarian Role Management
-   Stripe Payment Integration
-   Publish / Unpublish System
-   Order Management
-   Responsive Design
-   Interactive Maps
-   Modern UI with Tailwind & DaisyUI

------------------------------------------------------------------------

## 🧪 Example API Routes

Base URL:

    https://book-courier-server-khaki.vercel.app/

  Method   Route                    Description
  -------- ------------------------ ----------------
  GET      /books                   Get all books
  POST     /books                   Add book
  PATCH    /books/:id               Update book
  DELETE   /books/:id               Delete book
  POST     /create-payment-intent   Stripe payment

------------------------------------------------------------------------

## 📄 License

This project is licensed under the MIT License.

------------------------------------------------------------------------

## 👨‍💻 Author

Developed with ❤️ by Book Courier Team
