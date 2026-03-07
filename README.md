# LinkedIn Clone 🚀

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge\&logo=google-chrome)](https://your-demo-link.com)

![LinkedIn Clone Demo](linkedin-demo.gif)

A **LinkedIn Clone web application** built using **React.js, Redux, Firebase, and Styled Components**.
This project replicates core LinkedIn features such as authentication, creating posts, sharing media, and interacting with posts.

---

## 🌐 Live Demo

Coming Soon...

*(The project will be deployed soon)*

---

## 📸 Project Preview

### Login Page

![Login Page](login-page.png)

### Feed Page

![Feed Page](home-page.png)

---

## ✨ Features

✔ Google Authentication using Firebase
✔ Create and share posts
✔ Upload images and videos
✔ Like posts functionality
✔ Real-time updates for posts and likes
✔ Auto authentication on refresh
✔ Responsive UI

---

## 🛠 Tech Stack

### Frontend

* React.js ⚛️
* Redux
* Styled Components
* JavaScript
* HTML5
* CSS3

### Backend / Services

* Firebase Authentication 🔥
* Firebase Firestore
* Firebase Storage

---

## 📂 Project Structure

```
src
 ├── components
 ├── actions
 ├── reducers
 ├── store
 ├── firebase
 ├── App.js
 └── index.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/Priyansh-Chandravanshi/LinkedIn-clone.git
```

### 2️⃣ Navigate to project folder

```
cd linkedin-clone
```

### 3️⃣ Install dependencies

```
npm install
```

### 4️⃣ Run the development server

```
npm start
```

Open browser:

```
http://localhost:3000
```

---

## 🔑 Firebase Setup

1. Go to **Firebase Console**
2. Create a new project
3. Add a **Web App**
4. Copy Firebase configuration

Paste it inside:

```
src/firebase/config.js
```

Example:

```
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

export default firebaseConfig;
```

Enable **Google Authentication** in Firebase:

```
Firebase Console → Authentication → Sign-in Method → Enable Google
```

---

## 🚀 Build for Production

```
npm run build
```

---

## 📈 Future Improvements

* Comment system
* User profile page
* Notifications
* Messaging system

---

## 👨‍💻 Author

**Priyanshu Chandravanshi**

GitHub:
https://github.com/Priyansh-Chandravanshi

---

## ⭐ Support

If you like this project, please consider giving it a **star ⭐ on GitHub**.
