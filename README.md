# NeuroFit

NeuroFit is a premium AI-powered fitness and nutrition ecosystem that leverages the **Gemini API** to provide personalized coaching, health insights, and meal tracking. Built with the **MERN** stack, it offers a sophisticated dashboard that transforms raw data into actionable fitness intelligence.

---

## Features

- **AI Fitness Coach**: Real-time assessments and personalized recommendations powered by Gemini.
- **Smart Meal Tracking**: Analyze calories and macronutrients with AI-driven meal logs.
- **Goal Management**: Set and track weight loss, muscle gain, or maintenance goals with automated progress calculations.
- **Dynamic Dashboard**: Visualized progress markers for workouts and nutrition.
- **Fully Responsive**: Seamless experience across mobile, tablet, and desktop devices.
- **Premium UI/UX**: Modern glassmorphism design with smooth animations using Framer Motion.

---

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Recharts.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **AI Integration**: Google Gemini API.
- **Auth**: JWT (JSON Web Tokens) with Secure HTTP-Only Cookies.

---

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/FaizanAhmeddd27/NeuroFit
cd NeuroFit
```

### 2. Backend Configuration
Navigate to the `server` directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
```

### 3. Frontend Configuration
Navigate to the `client` directory and install dependencies:
```bash
cd ../client
npm install
```

### 4. Run the Application
Start the backend server:
```bash
# In the /server directory
npm run dev
```

Start the frontend development server:
```bash
# In the /client directory
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 📂 Project Structure

```text
NeuroFit/
├── client/                # React (Vite) Frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Dashboard, Goals, Workouts, etc.
│   │   ├── context/       # Auth and Global State
│   │   └── services/      # API communication
├── server/                # Node.js/Express Backend
│   ├── config/            # Database and API configs
│   ├── controllers/       # Business logic
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API endpoints
│   └── middleware/        # Auth & Error handlers
```

---

## 📄 License
This project is licensed under the MIT License.

---

## 👨‍💻 Author
**Faizan Ahmed** - [GitHub](https://github.com/FaizanAhmeddd27)
