# MilitaryManagement Backend

## 📦 Περιγραφή
Node.js + Express backend για την εφαρμογή MilitaryManagement. Υποστηρίζει:

- CRUD για στρατιωτικό προσωπικό
- CRUD για υπηρεσίες και εκπαιδεύσεις
- JWT Authentication
- Swagger τεκμηρίωση στο `/api-docs`
- Upload αρχείων σε προσωπικό
- MongoDB με σύνδεση Atlas

---

## 🛠️ Εγκατάσταση

```bash
npm install
```

---

## 🚀 Εκκίνηση

```bash
node server.js
```

> Βεβαιώσου ότι έχεις το `.env` με τα εξής:
```
MONGO_URI=mongodb+srv://george6627:7qKWuXYsSGf39NfC@cluster0.7dre2.mongodb.net/
JWT_SECRET=supersecretkey
```

---

## 🔁 Endpoints

- `GET /api/personnel`
- `POST /api/personnel`
- `PUT /api/personnel/:id`
- `DELETE /api/personnel/:id`
- `POST /api/uploads/personnel/:id` (file upload)
- `GET /api-docs` (Swagger)

---

## 📂 Δομή

- `controllers/` - χειριστές API
- `services/` - λογική εφαρμογής
- `routes/` - endpoints
- `models/` - mongoose σχήματα
- `dtos/` - Data Transfer Objects
- `uploads/` - αποθηκευμένα αρχεία

---

## 🛡️ CORS

Ενεργοποιημένο για frontend στο `http://localhost:5173`.

---

## 🧪 Testing

Διαθέσιμος φάκελος `tests/` για μονάδες.
