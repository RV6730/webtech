# Amity University Student Portal

Welcome to the Amity University Student Portal - a comprehensive web-based platform for students to access university resources, academic information, and campus services.

## 🌐 Live Website

**🔗 Website URL: [https://rv6730.github.io/webtech/](https://rv6730.github.io/webtech/)**

> **Note**: After merging this PR and enabling GitHub Pages in repository settings, the website will be live at the above URL. See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed setup instructions.

## 📋 Features

- **Student Portal Dashboard**: Access to various student services and resources
- **Election System**: View and participate in university elections
- **News & Updates**: Stay informed about campus news and events
- **Login/Signup System**: User authentication for personalized access
- **Database Viewer**: View and manage all data stored in the browser's local storage
- **Responsive Design**: Mobile-friendly interface

## 🚀 Deployment

This website is deployed using GitHub Pages. The deployment is automatic from the main branch.

**📖 For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)**

### Quick Setup:

1. Merge this PR to the main branch
2. Go to repository Settings → Pages
3. Set Source to "GitHub Actions"
4. Website will be live at: https://rv6730.github.io/webtech/

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
├── vott.html               # Voting interface
├── ass(vote).html          # Voting page (alternative)
├── ongoing-elections.html  # Active elections
├── voters.html             # Voter information
├── about.html              # About page
├── news.html               # News and updates
├── other.html              # Additional resources
├── rule.html               # Rules and regulations
├── student-portal-styles.css  # Main stylesheet
├── election-styles.css     # Election-specific styles
├── vott-styles.css         # Voting page styles
├── css1.css                # Additional styles
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

## 📊 How to View Stored Data

This application uses **browser localStorage** to store data such as votes, user preferences, and application state. To view all stored data:

### Method 1: Using the Built-in Database Viewer (Recommended)
1. Open the website in your browser
2. Click on **"Open Database Viewer"** button on the home page, or
3. Navigate to `database-viewer.html` directly, or
4. From the main dashboard, click on **"Database Viewer"** in the navigation menu

The Database Viewer provides:
- **View All Data**: See all localStorage items in a formatted table
- **Statistics**: Total items, storage size, and last update time
- **Individual Item View**: Click "View" to see the full content of any item
- **Export**: Download all data as a JSON file for backup
- **Delete**: Remove individual items or clear all data
- **Refresh**: Update the view with the latest data

### Method 2: Using Browser Developer Tools
If you prefer to use browser developer tools:
1. Open your browser's Developer Tools (F12 or Right-click → Inspect)
2. Go to the **Application** tab (Chrome/Edge) or **Storage** tab (Firefox)
3. In the left sidebar, expand **Local Storage**
4. Click on your website's domain to view all stored data

### What Data is Stored?
The application stores:
- **Votes**: Selected candidates in elections (key: "vote")
- **User Sessions**: Username and login state
- **Application State**: Various UI preferences and settings

### Data Privacy
- All data is stored locally in your browser
- No data is sent to external servers
- You can clear all data at any time using the Database Viewer's "Clear All" button
- Data persists until you clear it or clear your browser cache

## 🛠️ Technologies Used

- **HTML5**: Structure and content
- **CSS3**: Styling and layout
- **JavaScript**: Interactive functionality
- **GitHub Pages**: Hosting and deployment

## 📝 License

© 2025 Amity University Bengaluru. All Rights Reserved.

## 👥 Support & Contact

For more information about the student portal:
- Visit the [website](https://rv6730.github.io/webtech/) after deployment
- Check the footer links for Privacy Policy, Terms of Service, and Contact information
- Submit issues via the [GitHub repository](https://github.com/RV6730/webtech/issues)

---

**Note**: This is a student portal project for Amity University Bengaluru. All images and content are property of their respective owners.
