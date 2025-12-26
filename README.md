# Amity University Student Portal

Welcome to the Amity University Student Portal - a comprehensive web-based platform for students to access university resources, academic information, and campus services.

## 🌐 Live Website

The website is deployed and accessible at: **https://rv6730.github.io/webtech/**

## 📋 Features

- **Student Portal Dashboard**: Access to various student services and resources
- **Election System**: View and participate in university elections
- **News & Updates**: Stay informed about campus news and events
- **Login/Signup System**: User authentication for personalized access
- **Responsive Design**: Mobile-friendly interface

## 🚀 Deployment

This website is deployed using GitHub Pages. The deployment is automatic from the main branch.

### Deployment Steps:

1. All static files (HTML, CSS, JavaScript, images) are in the repository root
2. GitHub Pages is configured to serve from the root directory
3. The website is automatically deployed when changes are pushed to the repository

### Local Development

To run this website locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/RV6730/webtech.git
   ```

2. Navigate to the project directory:
   ```bash
   cd webtech
   ```

3. Open `index.html` in your web browser or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```

4. Access the website at `http://localhost:8000`

## 📁 Project Structure

```
webtech/
├── index.html              # Landing page
├── main.html               # Main dashboard
├── login.html              # Login page
├── signup.html             # Registration page
├── candidates.html         # Election candidates
├── vott.html              # Voting page
├── ongoing-elections.html  # Active elections
├── voters.html            # Voter information
├── about.html             # About page
├── news.html              # News and updates
├── other.html             # Additional resources
├── rule.html              # Rules and regulations
├── student-portal-styles.css  # Main stylesheet
├── election-styles.css    # Election-specific styles
├── vott-styles.css        # Voting page styles
├── css1.css               # Additional styles
├── logo.png               # University logo
├── *.jpg                  # Images and graphics
└── README.md              # This file
```

## 🎨 Pages Overview

### Main Pages
- **Index**: Welcome page with university information and login/register buttons
- **Main Dashboard**: Student portal homepage with services overview
- **Login/Signup**: User authentication pages

### Election Features
- **Candidates**: View election candidates and their information
- **Voting**: Cast your vote in ongoing elections
- **Ongoing Elections**: List of active elections
- **Voters**: Registered voter information

### Information Pages
- **About**: University information
- **News**: Campus news and updates
- **Rules**: Election rules and regulations
- **Other**: Additional resources

## 🛠️ Technologies Used

- **HTML5**: Structure and content
- **CSS3**: Styling and layout
- **JavaScript**: Interactive functionality
- **GitHub Pages**: Hosting and deployment

## 📝 License

© 2025 Amity University Bengaluru. All Rights Reserved.

## 👥 Contact

For questions or support, please contact:
- Privacy Policy
- Terms of Service
- Contact Us

---

**Note**: This is a student portal project for Amity University Bengaluru. All images and content are property of their respective owners.
