# 🎮 Game_Store Backend

Game_Store is a backend service for an online gaming products store, built with **Express.js** and **TypeScript**. It provides essential e-commerce features such as user management, authentication, product listings, and categories.

---

## 📘 API Documentation

You can explore and test all API endpoints using the Postman collection below:

📥 [Download Game_Store.postman_collection.json](./postman/GameStore.postman_collection.json)

To use it:

1. Open [Postman](https://www.postman.com/)
2. Click **Import**
3. Select the downloaded `.json` file
4. Enjoy testing all endpoints like products, users, auth, and categories!

---

## 🛠 Tech Stack

- **Backend Framework**: [Express.js](https://expressjs.com/)
- **Language**: TypeScript
- **Validation**: [Zod](https://github.com/colinhacks/zod)
- **Authentication**:
  - Password hashing: [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
  - Token handling: [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- **Database**: [MongoDB](https://www.mongodb.com/)

---

## 📂 Project Structure

src/
├── controllers/
├── models/
├── middlewares/
├── types/
├── utils/
    └──
    ├── validations/
    ├── error/
    ├── logger/
└── index.ts


---

## 🚀 Features

### ✅ Authentication (`/auth`)
- **Register**
- **Login**
- **Forget Password**
- **Reset Password**
- **Refresh Token**

### 👤 Users (`/users`)
- Get user profile
- Update user info

### 🛒 Products (`/products`)
- Create, read, update, delete products

### 🗂 Categories (`/categories`)
- Manage product categories

> More features will be added soon!

---

## 📦 Installation

```bash
git clone git@github.com:KianJanloo/Game-Store.git
cd Game_Store
npm install
