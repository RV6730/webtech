# Amity University Student Portal

A comprehensive student portal with voting system for Amity University Bengaluru. This application includes user authentication, election management, and voting capabilities.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables (copy and edit .env.example)
cp .env.example .env

# 3. Start MongoDB (if running locally)
# mongod

# 4. Seed the database with sample data
npm run seed

# 5. Start the server
npm start

# 6. Open your browser
# Visit http://localhost:5000
```

## Features

- **User Authentication**: Secure registration and login system with JWT tokens
- **Election Management**: Create and manage elections for different categories (GDG, Microsoft SAE, Amity College, IEEE)
- **Candidate Profiles**: Detailed candidate information with manifesto and descriptions
- **Voting System**: Secure voting with one-vote-per-election enforcement
- **Real-time Results**: View election results and vote counts

## Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)
- TailwindCSS (via CDN)
- Font Awesome Icons

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- JWT for authentication
- bcryptjs for password hashing

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd webtech
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   ```bash
   cp .env.example .env
   ```
   - Update the `.env` file with your configuration:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: A secure secret key for JWT tokens
     - `PORT`: Server port (default: 5000)

4. **Start MongoDB**
   - If using local MongoDB:
     ```bash
     mongod
     ```
   - If using MongoDB Atlas, ensure your connection string in `.env` is correct

5. **Start the server**
   - Development mode (with auto-restart):
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm start
     ```

6. **Access the application**
   - Open your browser and navigate to `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires authentication)

### Candidates
- `GET /api/candidates` - Get all candidates (supports `?category=` filter)
- `GET /api/candidates/:id` - Get specific candidate
- `POST /api/candidates` - Create candidate (requires authentication)
- `PUT /api/candidates/:id` - Update candidate (requires authentication)
- `DELETE /api/candidates/:id` - Delete candidate (requires authentication)

### Elections
- `GET /api/elections` - Get all elections (supports `?status=` and `?category=` filters)
- `GET /api/elections/:id` - Get specific election
- `POST /api/elections` - Create election (requires authentication)
- `PUT /api/elections/:id` - Update election (requires authentication)
- `DELETE /api/elections/:id` - Delete election (requires authentication)

### Votes
- `POST /api/votes` - Submit a vote (requires authentication)
- `GET /api/votes/my-votes` - Get user's voting history (requires authentication)
- `GET /api/votes/check/:electionId` - Check if user has voted in election (requires authentication)
- `GET /api/votes/results/:electionId` - Get election results

## Database Schema

### User
- fullname: String
- sen: String (unique)
- email: String (unique)
- phonenumber: String
- password: String (hashed)
- createdAt: Date

### Candidate
- name: String
- position: String
- category: String (enum: gdg, microsoft, amity, IEEE)
- image: String
- description: String
- manifesto: String
- voteCount: Number
- createdAt: Date

### Election
- title: String
- description: String
- category: String
- startDate: Date
- endDate: Date
- status: String (enum: upcoming, ongoing, completed)
- candidates: [ObjectId] (references Candidate)
- createdAt: Date

### Vote
- user: ObjectId (references User)
- election: ObjectId (references Election)
- candidate: ObjectId (references Candidate)
- votedAt: Date
- Unique index on (user, election) to prevent duplicate votes

## Project Structure

```
webtech/
├── backend/
│   ├── config/
│   │   └── database.js          # Database connection configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── candidateController.js
│   │   ├── electionController.js
│   │   └── voteController.js
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Candidate.js         # Candidate schema
│   │   ├── Election.js          # Election schema
│   │   └── Vote.js              # Vote schema
│   └── routes/
│       ├── auth.js              # Authentication routes
│       ├── candidates.js        # Candidate routes
│       ├── elections.js         # Election routes
│       └── votes.js             # Vote routes
├── *.html                       # Frontend HTML pages
├── *.css                        # Stylesheets
├── *.jpg, *.png                 # Images
├── server.js                    # Main server file
├── package.json                 # Project dependencies
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore file
└── README.md                    # This file
```

## Security Features

- 🔐 Password hashing using bcryptjs
- 🎫 JWT-based authentication with token expiration
- 🛡️ Protected API endpoints with authentication middleware
- ✅ Input validation using express-validator
- 🌐 CORS enabled for cross-origin requests
- 🗳️ Unique constraint on voting (one vote per user per election)
- 🚫 SQL injection prevention through Mongoose ODM
- 🔒 Environment variables for sensitive data

## Troubleshooting

### MongoDB Connection Issues
If you encounter MongoDB connection errors:
1. Make sure MongoDB is running: `mongod`
2. Check your `MONGODB_URI` in `.env`
3. For local MongoDB: `mongodb://localhost:27017/amity_student_portal`
4. For MongoDB Atlas: Use the connection string from your Atlas dashboard

### Port Already in Use
If port 5000 is already in use:
1. Change the `PORT` in your `.env` file
2. Or kill the process using port 5000: `lsof -ti:5000 | xargs kill`

### Dependencies Issues
If you encounter dependency errors:
```bash
rm -rf node_modules package-lock.json
npm install
```

### CORS Issues
If you face CORS errors when testing frontend:
- Make sure the backend server is running
- Check that CORS is enabled in `server.js`
- Use the same origin for both frontend and backend (e.g., http://localhost:5000)

## Testing the Application

### 1. Create a Test User
Visit http://localhost:5000/signup.html and register with:
- Full Name: Test User
- SEN: A1234567
- Phone: 1234567890
- Email: test@amity.edu
- Password: password123

### 2. Login
Visit http://localhost:5000/login.html and use your credentials

### 3. View Candidates
Navigate to the candidates page to see seeded candidates

### 4. Submit a Vote
Vote for your preferred candidate in an ongoing election

## API Documentation

Detailed API documentation is available in [API_DOCS.md](API_DOCS.md)

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
ISC

## Support
For issues and questions, please create an issue in the repository.
