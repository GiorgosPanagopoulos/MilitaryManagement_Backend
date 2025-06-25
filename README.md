# ⚓ MilitaryManagement Backend

[![Node.js](https://img.shields.io/badge/Node.js-18.x-brightgreen.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-Framework-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)
[![Build](https://img.shields.io/badge/Build-Passing-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Backend REST API για διαχείριση στρατιωτικού προσωπικού, εκπαιδεύσεων, και στατιστικών.

---

## 📦 Τεχνολογίες

- **Node.js** / **Express.js**
- **MongoDB Atlas**
- **Mongoose**
- **JWT Authentication**
- **Swagger (API docs)**
- **Multer (file uploads)**

---

## 🚀 Εκκίνηση τοπικά

### 1️⃣ Κλώνος αποθετηρίου

```bash
git clone https://github.com/GiorgosPanagopoulos/MilitaryManagement_Backend.git
cd MilitaryManagement_Backend
```

### 2️⃣ Εγκατάσταση εξαρτήσεων

```bash
npm install
```

### 3️⃣ Δημιουργία αρχείου `.env`

```bash
touch .env
```

Προσθέτεις μέσα:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Εκκίνηση σε development mode

```bash
npm run dev
```

Η εφαρμογή θα τρέχει στο:  
📍 `http://localhost:5000`

---

## 📂 Δομή Backend

```
├── controllers/
├── dtos/
├── middleware/
├── models/
├── repositories/
├── routes/
├── services/
├── files/
├── swagger.js
├── index.js
```

---

## 📡 Swagger UI

Μπορείς να δεις και να δοκιμάσεις όλα τα endpoints στο:  
👉 `http://localhost:5000/api-docs`

---

## 📁 Ανεβάσματα Αρχείων

- Υποστήριξη για αρχεία `.pdf`, `.jpg`, `.png`
- Ανεβαίνουν στον φάκελο: `uploads/`
- Endpoint: `POST /uploads/personnel/:id`

---

## 🧪 Τεστ

```bash
npm run test
```

---

## 👤 Συντάκτης

George Panagopoulos  
📧 george6627@hotmail.com
🔗 [GitHub](https://github.com/GiorgosPanagopoulos)

---
## 📜 License

MIT © 2025 Giorgos Panagopoulos
