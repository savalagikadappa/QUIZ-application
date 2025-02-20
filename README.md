# Interactive Quiz Platform 🎮✨

Welcome to the **Interactive Quiz Platform** – your go-to application for taking fun and challenging quizzes, getting instant feedback, and tracking your progress! 🚀

## Overview 🌟
This web application allows you to:
- Attempt quizzes based on a provided question set 📄
- Receive immediate feedback after every answer ⚡
- Track your progress with a detailed scoreboard 📊
- Retake quizzes multiple times for practice and improvement 🔄
- Enjoy bonus offline support with IndexedDB for saving your quiz history 💾

## Features 🚀
- **Quiz Creation & Management**
  - Dynamic display of quiz questions.
  - Supports multiple attempts.
  - Maintains an attempt history.
- **User Interaction**
  - Instant answer feedback.
  - Timer-based questions (30 seconds per question ⏱️).
- **Progress Tracking**
  - Detailed scoreboard at the end of each quiz.
- **Bonus**
  - Offline persistence using IndexedDB.

## Live Demo 🌐
Check out the deployed application on Vercel:  
[Interactive Quiz Platform](https://kadappaquiz.vercel.app) ✨

## Screenshots 📸
Here are some snapshots of the **Interactive Quiz Platform** in action:

- **Sample question displayed during the quiz**
  ![Sample Question](sample%20question.png)

- **Real-time feedback (correct & incorrect answers)**
  ![Real-time Feedback](real%20time%20feeback%20green%20is%20correct%20red%20is%20wrong%20which%20we%20marked.png)

- **Realtime feedback when a wrong answer is selected**
  ![Wrong Answer Feedback](realtime%20feedback%20for%20wrong%20answer.png)

- **Scoreboard shown at the end of the quiz**
  ![Scoreboard](score%20shown%20at%20the%20end.png)

- **Viewing past attempt results stored using IndexedDB**
  ![Past Attempt Results](showing%20past%20attempt%20results%20using%20indexedDB.png)

## Getting Started 🛠️

### Prerequisites
Before running the app, ensure you have:
- [Node.js](https://nodejs.org/) (v12 or later)
- npm (or yarn) installed

### Installation
1. **Clone the Repository**
   ```bash
   git clone https://github.com/savalagikadappa/QUIZ-application.git
   cd QUIZ-application


# 🎮 Interactive Quiz Platform ✨

## 📥 Install Dependencies  
First, install Vite globally (if not already installed):  
```bash
npm install -g vite
npm install
```
or if you use yarn:  
```bash
yarn install
```

---

## 🚀 Run the Application Locally  
```bash
npm run dev
```
or:  
```bash
yarn dev
```

---

## 🌍 Open in Browser  
Visit **[http://localhost:5173](http://localhost:5173)** to explore the app!  

---

## 📁 Project Structure  
The project is structured for maintainability and scalability:  

```csharp
QUIZ-application/
├── public/
│   └── vite.svg
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── assets/
│   │   ├── images/
│   │   │   ├── bg.jpg
│   │   │   ├── image.png
│   │   └── react.svg
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── QuestionCard.jsx
│   │   └── sample_quiz.pdf
│   ├── pages/
│   │   ├── Quiz.jsx
│   │   └── Results.jsx
│   ├── styles/
│   │   ├── Navbar.css
│   │   ├── QuestionCard.css
│   │   └── Results.css
```

---

## 💎 Code Quality & Best Practices  
✔ **Modular Code:** Well-structured and maintainable  
✔ **Inline Documentation:** Comments explain complex logic  
✔ **Edge Case Handling:** Input validation, timer expiration handling, and error management  

---

## 🚀 Deployment  
The application is **deployed on Vercel** and accessible online:  
🔗 **[Live Quiz Platform](https://kadappaquiz.vercel.app)**  

---

## 💾 Bonus: Offline Capabilities  
The quiz history is **saved using IndexedDB**, so your progress remains available even when you're offline!  

---

## 🤝 Contributing  
Contributions are welcome! Follow these steps:  

1. **Fork the repository**  
2. **Create a new branch:**  
   ```bash
   git checkout -b feature/YourFeature
   ```
3. **Commit your changes:**  
   ```bash
   git commit -m "Add some feature"
   ```
4. **Push to the branch:**  
   ```bash
   git push origin feature/YourFeature
   ```
5. **Open a Pull Request**  

---
