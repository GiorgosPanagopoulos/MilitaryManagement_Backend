# ⚓ MilitaryManagement Backend

[![Node.js](https://img.shields.io/badge/Node.js-18.x-brightgreen.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-Framework-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)
[![Build](https://img.shields.io/badge/Build-Passing-success.svg)]()
[![Coverage](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg)]()
[![Last Commit](https://img.shields.io/github/last-commit/GiorgosPanagopoulos/MilitaryManagement_Backend.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Backend REST API για διαχείριση στρατιωτικού προσωπικού, εκπαιδεύσεων, χρηστών και στατιστικών του Πολεμικού Ναυτικού.

---

## 📦 Τεχνολογίες

- **Node.js** / **Express.js**
- **MongoDB Atlas** με **Mongoose ODM**
- **JWT Authentication**
- **Swagger** για τεκμηρίωση API
- **Multer** για ανεβάσματα αρχείων
- **Winston** για logging

---

## 🚀 Εκκίνηση Τοπικά

### 1️⃣ Κλωνοποίηση αποθετηρίου

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

#### Παράδειγμα περιεχομένου:

```env
PORT=5001
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/MilitaryDB
JWT_SECRET=your_secret_here
```

### 4️⃣ Εκκίνηση development server

```bash
npm run dev
```

Η εφαρμογή θα τρέχει στο:  
👉 `http://localhost:5001`

---


## 📡 Swagger UI

Πλήρης τεκμηρίωση και δοκιμή των endpoints:

📍 `http://localhost:5001/api-docs`

---

## 📁 Uploads

- Υποστηριζόμενοι τύποι: `.pdf`, `.jpg`, `.png`
- Endpoint: `POST /api/uploads/personnel/:id`
- Αποθηκεύονται στον φάκελο: `uploads/personnel/`

---

## 🧪 Τεστ

```bash
npm run test
```

---

## 📫 Postman Tests

- Υπάρχει αρχείο **`MilitaryManagement.postman_collection.json`** για αυτοματοποιημένα tests όλων των endpoints.
- Περιλαμβάνει:
  - Auth (login, register)
  - CRUD προσωπικού, εκπαιδεύσεων
  - Στατιστικά
- ✅ Περιλαμβάνονται tokens για admins και users
- 🔁 Υποστηρίζεται pre-request scripting & variables

---

## 🚀 Deployment

Μπορείς να κάνεις deploy σε οποιοδήποτε VPS ή hosting provider (π.χ. Heroku, Render κ.ά.):

```bash
npm install
npm run build     # (αν υπάρχει build script)
npm start
```

---

## 🔐 Ρόλοι & Πρόσβαση

- **Admin:** διαχείριση χρηστών, στατιστικών, εκπαιδεύσεων, προσωπικού
- **User:** προβολή, προσθήκη & επεξεργασία δικών του στοιχείων

---

## 👨‍💻 Συντάκτης

George Panagopoulos  
📧 george6627@hotmail.com  
🔗 [GitHub](https://github.com/GiorgosPanagopoulos)

---

## 📄 Άδεια

MIT © 2025 Giorgos Panagopoulos