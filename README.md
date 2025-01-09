# 💸 Expense Tracker Application

Effortlessly manage your daily expenses, stay on top of your budget, and gain insights into your spending habits! This responsive web app is your ultimate companion for financial discipline. Built with **Next.js**, **MongoDB**, and **Redux Toolkit**, it combines speed, reliability, and scalability.

---

## ✨ Features

🚀 **Track Expenses:** Organize spending across multiple categories  
📊 **Set Spending Limits:** Define monthly and category-specific budgets  
📅 **Daily & Monthly Insights:** Summarize expenses with clear, actionable reports  
🛠️ **Edit & Delete:** Update or remove transactions as needed  
🔄 **Reset Anytime:** Clear expense history and budget limits with a click  
📱 **Responsive Design:** Optimized for mobile and desktop

---

## ⚙️ Prerequisites

- **Node.js:** Version 18 or higher
- **MongoDB:** Your database of choice (local or cloud)
- **Git:** For cloning the repository

---

## 🚀 Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/abuabddullah/jt-expense-tracker.git
   cd jt-expense-tracker
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**  
   Create a `.env` file in the root directory and add your MongoDB connection string:

   ```env
   MONGODB_URI=<your-mongodb-uri>
   ```

4. **Start the Development Server:**

   ```bash
   npm run dev
   ```

   Your app is now running at `http://localhost:3000`. 🎉

---

## 🛠️ API Documentation

### 📝 Expenses

- **GET** `/api/expenses`: Retrieve all expenses
- **POST** `/api/expenses`: Add a new expense
- **PUT** `/api/expenses/:id`: Update an expense
- **DELETE** `/api/expenses/:id`: Remove an expense
- **POST** `/api/expenses/reset`: Reset all expenses

### 🎯 Spending Limits

- **GET** `/api/limits`: Retrieve all spending limits
- **POST** `/api/limits`: Add a new spending limit
- **PUT** `/api/limits/:id`: Update a spending limit
- **DELETE** `/api/limits/:id`: Remove a spending limit
- **POST** `/api/limits/reset`: Reset all limits

---

## 🖥️ Tech Stack

- **Frontend:** Next.js
- **Backend:** Node.js
- **Database:** MongoDB
- **State Management:** Redux Toolkit

---

## 💡 Why Choose This Expense Tracker?

This app is designed to make financial tracking simple, intuitive, and powerful:

- Stay organized without the hassle of spreadsheets
- Analyze spending habits to make smarter financial decisions
- Enjoy seamless user experience across devices

---

## 🤝 Contributing

Want to contribute? Fork the repository, make your changes, and submit a pull request. Let’s make this app even better together!

---

## 📄 Regards

Asif A Owadud
