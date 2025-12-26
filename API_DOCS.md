# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

The token is returned upon successful login or registration.

---

## Auth Endpoints

### Register a New User
**POST** `/auth/register`

**Request Body:**
```json
{
  "fullname": "John Doe",
  "sen": "A1234567",
  "email": "john.doe@amity.edu",
  "phonenumber": "9876543210",
  "password": "password123"
}
```

**Validation Rules:**
- `fullname`: Required, non-empty string
- `sen`: Required, unique SEN number
- `email`: Required, valid email format, unique
- `phonenumber`: Required, 10-digit number
- `password`: Required, minimum 8 characters

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60a7b8c9d1234567890abcde",
    "fullname": "John Doe",
    "sen": "A1234567",
    "email": "john.doe@amity.edu"
  }
}
```

---

### Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "username": "A1234567",
  "password": "password123"
}
```

Note: `username` can be either SEN number or email address.

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60a7b8c9d1234567890abcde",
    "fullname": "John Doe",
    "sen": "A1234567",
    "email": "john.doe@amity.edu"
  }
}
```

---

### Get User Profile
**GET** `/auth/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "60a7b8c9d1234567890abcde",
  "fullname": "John Doe",
  "sen": "A1234567",
  "email": "john.doe@amity.edu",
  "phonenumber": "9876543210",
  "createdAt": "2025-01-15T10:30:00.000Z"
}
```

---

## Candidates Endpoints

### Get All Candidates
**GET** `/candidates`

**Query Parameters:**
- `category` (optional): Filter by category (gdg, microsoft, amity, IEEE)

**Example:**
```
GET /candidates?category=gdg
```

**Response:**
```json
[
  {
    "_id": "60a7b8c9d1234567890abcde",
    "name": "Rajesh Kumar",
    "position": "President",
    "category": "gdg",
    "image": "1.jpg",
    "description": "Passionate about Google technologies",
    "manifesto": "Will organize monthly workshops",
    "voteCount": 15,
    "createdAt": "2025-01-15T10:30:00.000Z"
  }
]
```

---

### Get Candidate by ID
**GET** `/candidates/:id`

**Response:**
```json
{
  "_id": "60a7b8c9d1234567890abcde",
  "name": "Rajesh Kumar",
  "position": "President",
  "category": "gdg",
  "image": "1.jpg",
  "description": "Passionate about Google technologies",
  "manifesto": "Will organize monthly workshops",
  "voteCount": 15,
  "createdAt": "2025-01-15T10:30:00.000Z"
}
```

---

### Create Candidate
**POST** `/candidates`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "New Candidate",
  "position": "President",
  "category": "gdg",
  "image": "candidate.jpg",
  "description": "Description here",
  "manifesto": "My manifesto"
}
```

**Response:**
```json
{
  "message": "Candidate created successfully",
  "candidate": { ... }
}
```

---

## Elections Endpoints

### Get All Elections
**GET** `/elections`

**Query Parameters:**
- `status` (optional): Filter by status (upcoming, ongoing, completed)
- `category` (optional): Filter by category (gdg, microsoft, amity, IEEE)

**Example:**
```
GET /elections?status=ongoing&category=gdg
```

**Response:**
```json
[
  {
    "_id": "60a7b8c9d1234567890abcde",
    "title": "GDG Lead Elections 2025",
    "description": "Annual elections for GDG",
    "category": "gdg",
    "startDate": "2025-01-20T00:00:00.000Z",
    "endDate": "2025-01-27T23:59:59.000Z",
    "status": "ongoing",
    "candidates": [...],
    "createdAt": "2025-01-15T10:30:00.000Z"
  }
]
```

---

### Get Election by ID
**GET** `/elections/:id`

**Response:**
```json
{
  "_id": "60a7b8c9d1234567890abcde",
  "title": "GDG Lead Elections 2025",
  "description": "Annual elections for GDG",
  "category": "gdg",
  "startDate": "2025-01-20T00:00:00.000Z",
  "endDate": "2025-01-27T23:59:59.000Z",
  "status": "ongoing",
  "candidates": [...],
  "createdAt": "2025-01-15T10:30:00.000Z"
}
```

---

### Create Election
**POST** `/elections`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "New Election 2025",
  "description": "Election description",
  "category": "gdg",
  "startDate": "2025-02-01T00:00:00.000Z",
  "endDate": "2025-02-10T23:59:59.000Z",
  "candidates": ["candidateId1", "candidateId2"]
}
```

**Response:**
```json
{
  "message": "Election created successfully",
  "election": { ... }
}
```

---

## Votes Endpoints

### Submit a Vote
**POST** `/votes`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "electionId": "60a7b8c9d1234567890abcde",
  "candidateId": "60a7b8c9d1234567890abcdf"
}
```

**Validation:**
- Election must be ongoing (between startDate and endDate)
- User can only vote once per election
- Candidate must belong to the election

**Response:**
```json
{
  "message": "Vote submitted successfully",
  "vote": {
    "_id": "60a7b8c9d1234567890abce0",
    "user": "60a7b8c9d1234567890abce1",
    "election": "60a7b8c9d1234567890abcde",
    "candidate": "60a7b8c9d1234567890abcdf",
    "votedAt": "2025-01-22T14:30:00.000Z"
  }
}
```

**Error Responses:**
```json
{
  "message": "You have already voted in this election"
}
```
```json
{
  "message": "Election has not started yet"
}
```
```json
{
  "message": "Election has ended"
}
```

---

### Get User's Votes
**GET** `/votes/my-votes`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "_id": "60a7b8c9d1234567890abce0",
    "election": {
      "title": "GDG Lead Elections 2025",
      ...
    },
    "candidate": {
      "name": "Rajesh Kumar",
      ...
    },
    "votedAt": "2025-01-22T14:30:00.000Z"
  }
]
```

---

### Check Vote Status
**GET** `/votes/check/:electionId`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "hasVoted": true,
  "vote": {
    "_id": "60a7b8c9d1234567890abce0",
    ...
  }
}
```

or

```json
{
  "hasVoted": false,
  "vote": null
}
```

---

### Get Election Results
**GET** `/votes/results/:electionId`

**Response:**
```json
{
  "totalVotes": 150,
  "results": [
    {
      "candidate": {
        "_id": "60a7b8c9d1234567890abcdf",
        "name": "Rajesh Kumar",
        "position": "President",
        ...
      },
      "voteCount": 85
    },
    {
      "candidate": {
        "_id": "60a7b8c9d1234567890abce2",
        "name": "Priya Sharma",
        "position": "Vice President",
        ...
      },
      "voteCount": 65
    }
  ]
}
```

---

## Error Responses

All endpoints may return the following error responses:

**400 Bad Request**
```json
{
  "message": "Invalid input data",
  "errors": [...]
}
```

**401 Unauthorized**
```json
{
  "message": "No token, authorization denied"
}
```

**404 Not Found**
```json
{
  "message": "Resource not found"
}
```

**500 Internal Server Error**
```json
{
  "message": "Server error"
}
```

---

## Example Usage with JavaScript

### Register
```javascript
const response = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    fullname: 'John Doe',
    sen: 'A1234567',
    email: 'john.doe@amity.edu',
    phonenumber: '9876543210',
    password: 'password123'
  })
});
const data = await response.json();
```

### Login and Store Token
```javascript
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'A1234567',
    password: 'password123'
  })
});
const data = await response.json();
localStorage.setItem('authToken', data.token);
```

### Make Authenticated Request
```javascript
const token = localStorage.getItem('authToken');
const response = await fetch('http://localhost:5000/api/votes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    electionId: '60a7b8c9d1234567890abcde',
    candidateId: '60a7b8c9d1234567890abcdf'
  })
});
const data = await response.json();
```

---

## Rate Limiting

Currently, there are no rate limits implemented. In production, consider adding rate limiting middleware to prevent abuse.

## Security Considerations

1. Always use HTTPS in production
2. Never commit the `.env` file or expose `JWT_SECRET`
3. Implement proper role-based access control for admin endpoints
4. Add CSRF protection for state-changing operations
5. Validate and sanitize all user inputs
6. Implement proper logging and monitoring
