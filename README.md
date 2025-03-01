
# **Globetrotter Challenge**

🌍 **Globetrotter Challenge** is a fun and interactive game where players guess destinations based on clues. Challenge your friends and see who can score the highest!

---

## **Features**
- 🎮 Guess the destination based on clues.
- � Track your score and number of correct/incorrect answers.
- 📤 **Challenge a Friend**: Share your score and invite friends to play.
- 🖼️ Dynamic invite image generation for sharing on WhatsApp.
- 📊 View your friend's score before playing.

---

## **Technologies Used**
- **Frontend**: React.js, HTML, CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Libraries**: Axios, React Confetti, html2canvas

---

## **Setup Instructions**

### **Prerequisites**
- Node.js and npm installed.
- MongoDB installed and running locally.

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/globetrotter-challenge.git
cd globetrotter-challenge
```

### **2. Backend Setup**
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:5000`.

### **3. Frontend Setup**
1. Navigate to the `frontend` folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`.

---

## **API Endpoints**

### **1. Register a User**
- **Method**: `POST`
- **URL**: `/api/user`
- **Request Body**:
  ```json
  {
    "username": "your-username",
    "score": 0
  }
  ```
- **Response**:
  ```json
  {
    "success": true
  }
  ```

### **2. Fetch User Details**
- **Method**: `GET`
- **URL**: `/api/users/:username`
- **Response**:
  ```json
  {
    "username": "your-username",
    "score": 25
  }
  ```

---

## **How to Play**
1. **Register**: Enter a unique username to start the game.
2. **Guess the Destination**: Read the clues and select the correct destination from the options.
3. **Track Your Score**: Your score and number of correct/incorrect answers will be displayed.
4. **Challenge a Friend**: Click the "Challenge a Friend" button to share your score and invite friends to play.
5. **View Fun Facts**: After a correct guess, explore fun facts and trivia about the destination.

---

## **Directory Structure**
```
globetrotter-challenge/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── config/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles/
│   └── package.json
├── README.md
└── package.json
```

---

## **Contributing**
Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---


Enjoy playing the **Globetrotter Challenge**! 🌍🎉
