✈️ Triviana
Journey Beyond Borders
A full-stack, AI-powered travel booking platform for flights, hotels, holiday packages, buses & trains — built with React, Node.js, and MongoDB.________________________________________
🌍 What is Triviana?
Triviana is a production-grade travel booking web app inspired by platforms like MakeMyTrip and Cleartrip. It combines smart UI design, a RESTful backend, and an AI-powered travel assistant to offer a seamless end-to-end trip planning and booking experience.
Whether you're booking a last-minute domestic flight, planning a monsoon holiday package, or searching for international stays — Triviana handles it all from a single, beautifully designed interface.
________________________________________
🚀 Key Features
🤖 Diya AI — Intelligent Travel Assistant
A built-in AI chat assistant that helps users plan trips, compare destinations, suggest packages, and answer travel queries in real time.
✈️ Flights
•	Domestic routes across all major Indian cities with live fare cards
•	International destinations — Dubai, Bangkok, Singapore, London, Paris, New York & more
•	One-way, round-trip & multi-city search
•	Cabin class filters: Economy, Business, First Class
🏨 Hotels
•	Curated hotel listings with detailed pages
•	Room types, amenities, ratings, reviews & photo galleries
•	Location-based hotel discovery
🌴 Holiday Packages
•	Seasonal collections — Summer, Monsoon, Winter & Festive deals
•	Trending group packages with fixed departures & expert guides
•	All-inclusive pricing (hotel + flights + meals + transport)
🚌 Bus & 🚂 Trains
•	Intercity bus and train search and booking
🔐 Authentication
•	Secure JWT-based login and signup system
•	Protected routes and session handling
💳 Payments
•	Razorpay payment gateway integration
•	Complete booking confirmation flow with invoice generation
🛠️ Admin Dashboard
•	Full CRUD for flights, hotels, packages, rooms & users
•	Review and booking management
________________________________________
🧱 Tech Stack
Layer	Technology
Frontend	React 18, Vite, Tailwind CSS, Redux Toolkit
Backend	Node.js, Express.js, REST API
Database	MongoDB, Mongoose ODM
Authentication	JWT, bcrypt
Payments	Razorpay
Media Storage	Cloudinary
Email	Nodemailer
Rate Limiting	express-rate-limit
________________________________________
📁 Project Structure
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
________________________________________
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
________________________________________
📸 App Preview
Hero Section	Domestic Flights	International Routes
Maldives, Swiss Alps & more	Mumbai → Goa, Delhi, Bengaluru...	Dubai, Singapore, Paris, NYC...
Holiday Packages	Group Tours	Seasonal Deals
Nepal, Maldives, Bhutan...	Rajasthan, Kerala, Himalayan...	Summer, Monsoon, Winter, Festive
________________________________________
🔗 API Endpoints (Overview)
POST   /api/auth/register        # Register new user
POST   /api/auth/login           # Login

GET    /api/flights              # Get all flights
GET    /api/hotels               # Get all hotels
GET    /api/hotels/:id           # Get hotel details

POST   /api/bookings             # Create booking
GET    /api/bookings/my          # Get user bookings

POST   /api/payments/create      # Initiate Razorpay payment
POST   /api/payments/verify      # Verify payment

GET    /api/admin/users          # Admin: all users
PATCH  /api/admin/hotels/:id     # Admin: update hotel
________________________________________
🤝 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.
1.	Fork the repo
2.	Create your feature branch: git checkout -b feature/your-feature
3.	Commit your changes: git commit -m 'Add your feature'
4.	Push to the branch: git push origin feature/your-feature
5.	Open a pull request
________________________________________
📄 License
This project is open source and available under the MIT License.
________________________________________
Built with ❤️ for travelers who dare to explore the world.
⭐ Star this repo if you found it helpful!

