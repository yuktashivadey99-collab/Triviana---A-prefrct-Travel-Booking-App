Triviana
Journey Beyond Borders
A full-stack, AI-powered travel booking platform for flights, hotels, holiday packages, buses & trains — built with React, Node.js, and MongoDB.

What is Triviana?
Triviana is a production-grade travel booking web app inspired by platforms like MakeMyTrip and Cleartrip. It combines smart UI design, a RESTful backend, and an AI-powered travel assistant to offer a seamless end-to-end trip planning and booking experience.
Whether you're booking a last-minute domestic flight, planning a monsoon holiday package, or searching for international stays — Triviana handles it all from a single, beautifully designed interface.

 Project Structure
triviana/
├── client/                      # React Frontend (Vite + Tailwind)
│   ├── public/
│   ├── src/
│   │   ├── assets/              # Images, icons
│   │   ├── components/
│   │   │   ├── common/          # Shared components (ProtectedRoute etc.)
│   │   │   ├── home/            # Hero, Flights, Hotels, Deals, AI sections
│   │   │   └── layout/          # Navbar, Footer
│   │   ├── hooks/               # Custom React hooks
│   │   ├── pages/               # Auth, Home, Flights, Hotels, Checkout...
│   │   ├── store/               # Redux store + slices
│   │   └── utils/               # API helpers
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── server/                      # Node.js Backend (Express)
    └── src/
        ├── config/              # DB, Cloudinary, Razorpay config
        ├── controllers/         # Auth, Booking, Flight, Hotel, Payment...
        ├── middleware/          # Auth, Error handling, Rate limiting
        ├── models/              # User, Hotel, Flight, Booking, Payment...
        ├── routes/              # All API routes
        └── utils/               # ApiError, ApiResponse, asyncHandler...

⚙️ Getting Started
Prerequisites
•	Node.js v18+
•	MongoDB (local or Atlas)
•	Razorpay account
•	Cloudinary account
Installation
bash
# 1. Clone the repository
git clone https://github.com/yuktashivadey99-collab/Triviana---A-prefrct-Travel-Booking-App.git
cd Triviana---A-prefrct-Travel-Booking-App

# 2. Install server dependencies
cd server
npm install

# 3. Install client dependencies
cd ../client
npm install
Environment Variables
Create a .env file inside the server/ folder:
env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
Create a .env file inside the client/ folder:
env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
Running the App
bash
# Run backend (from /server)
npm run dev

# Run frontend (from /client)
npm run dev
Frontend runs on http://localhost:5173
Backend runs on http://localhost:5000



