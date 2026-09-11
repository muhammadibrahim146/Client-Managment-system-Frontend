# Customer Record Management System

A full-stack **Customer Record Management System** built to manage customer information in an organized and efficient way.

The application allows administrators to log in, add customers, view customer records, search and filter customers, and manage customer payment/status information through a clean dashboard interface.

## 🚀 Features

* 🔐 Admin Login
* 📊 Dashboard
* 👤 Add New Customer
* 👥 View Customer Records
* ✏️ Update Customer Information
* 🗑️ Delete Customer Records
* 🔎 Search Customers
* 🎯 Filter Customers
* 💰 Customer Amount / Payment Management
* 📅 Month-wise Customer Records
* ✅ Paid / Unpaid Status
* 📱 Responsive Dashboard
* 🚪 Logout Functionality
* 🧭 Sidebar Navigation
* 📈 Reports Section

## 🛠️ Technologies Used

### Frontend

* React.js
* Vite
* React Router DOM
* Tailwind CSS
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* REST API

### Authentication

* Login Authentication
* Local Storage based login state

## 📂 Project Structure

```text
Customer-Record-Application/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Customer.jsx
│   │   │   ├── Addclient.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   │   └── Customer.model.js
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## 👤 Customer Information

Each customer record can contain information such as:

```text
Name
Address
Email
Phone
Month
Amount
Status
```

Example:

```json
{
  "name": "Ali Khan",
  "address": "Karachi",
  "email": "ali@example.com",
  "phone": "03001234567",
  "month": "September",
  "amount": 5000,
  "status": "Paid"
}
```

## 🔎 Search and Filtering

The application supports searching and filtering customer records.

For example, MongoDB can filter customers using:

```javascript
const filter = {
  name: { $regex: "Ali", $options: "i" },
  month: "September",
  status: "Paid"
};
```

This can find customers whose name contains **Ali**, whose month is **September**, and whose payment status is **Paid**.

## 🔄 Application Flow

```text
              User
                │
                ▼
             Login
                │
                ▼
           Dashboard
                │
       ┌────────┼─────────┐
       │        │         │
       ▼        ▼         ▼
 Add Client  Customers  Reports
       │        │
       └────────┘
             │
             ▼
        Backend API
             │
             ▼
          MongoDB
```

## 🔌 API Operations

The backend provides REST API endpoints for managing customer records.

Typical operations include:

| Method | Operation       | Description                  |
| ------ | --------------- | ---------------------------- |
| GET    | Get Customers   | Retrieve customer records    |
| GET    | Get Customer    | Retrieve a specific customer |
| POST   | Create Customer | Add a new customer           |
| PUT    | Update Customer | Update customer information  |
| DELETE | Delete Customer | Remove a customer            |

## 🧮 Customer Management

The system is designed to make customer record management easier by keeping customer information in a centralized database instead of maintaining records manually.

Administrators can:

1. Add a customer
2. View customer details
3. Search customers
4. Filter customers
5. Update customer information
6. Delete customer records
7. Track payment status
8. View records by month

## 📊 Dashboard

The dashboard provides an overview of the customer management system.

Possible dashboard statistics include:

* Total Customers
* Paid Customers
* Unpaid Customers
* Total Amount
* Monthly Customer Records

## 🔐 Authentication

The application includes an administrator login system.

After successful login, the application stores the login state and allows access to protected pages.

The logout operation removes the login state and redirects the administrator back to the login page.

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/customer-record-application.git
```

### 2. Go to the Project Directory

```bash
cd customer-record-application
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 4. Install Backend Dependencies

```bash
cd ../backend
npm install
```

## 🔑 Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Replace the MongoDB connection string with your own MongoDB database URL.

## ▶️ Run the Application

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

The backend will normally run on:

```text
http://localhost:5000
```

## 🗄️ Database

The application uses **MongoDB** as the database and **Mongoose** for database operations.

Customer records are stored as documents in MongoDB.

Example customer model:

```javascript
{
  name: String,
  address: String,
  email: String,
  phone: String,
  month: String,
  amount: Number,
  status: String
}
```

## 🎯 Project Purpose

The main purpose of this project is to build a practical full-stack application for managing customer records.

It demonstrates how a React frontend communicates with a Node.js/Express backend and how customer data is stored and managed using MongoDB.

## 📚 What I Learned

Through this project, I practiced:

* React.js
* React Router
* Component-based development
* Tailwind CSS
* REST APIs
* Node.js
* Express.js
* MongoDB
* Mongoose
* CRUD operations
* API integration
* Authentication
* Search and filtering
* Protected routes
* Responsive UI development
* Git and GitHub

## 🔮 Future Improvements

The project can be extended with:

* JWT authentication
* Role-based access control
* Admin and staff accounts
* Pagination
* Advanced reports
* PDF invoice generation
* Excel export
* Email notifications
* Payment history
* Customer profile pages
* Cloud deployment
* Dashboard charts
* Dark mode

## 👨‍💻 Author

**Muhammad Ibrahim**

Computer Science Student

---

⭐ If you find this project useful, feel free to star the repository.
