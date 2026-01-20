# BAHO AFRICA - Creative and Culture Hub

A MERN stack website for BAHO AFRICA, a Creative and Culture Hub based in Rwanda, empowering youth, artists, refugees, women, and creatives with disabilities through arts, innovation, culture, entrepreneurship, and education.

## 🎯 Organization Description

BAHO AFRICA is a Creative and Culture Hub based in Rwanda, empowering youth, artists, refugees, women, and creatives with disabilities through arts, innovation, culture, entrepreneurship, and education.

**Tagline:** Empowering Talent, Inspiring Africa

## 🛠 Tech Stack

- **Frontend:** ReactJS + Material UI
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Architecture:** MERN-based structure

## 📦 Project Structure

```
BAHO/
├── client/                 # React frontend
│   ├── public/             # Public assets
│   │   ├── index.html      # Main HTML file
│   │   ├── manifest.json   # Web app manifest
│   │   ├── favicon.ico     # Favicon
│   │   ├── logo192.png     # Logo 192x192
│   │   └── logo512.png     # Logo 512x512
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── styles/         # Style utilities
│   │   ├── App.js          # Main App component
│   │   ├── index.css       # Global styles
│   │   └── index.js        # App entry point
│   ├── package.json        # Client dependencies
│   └── package-lock.json
├── server/                 # Node.js backend
│   ├── models/             # MongoDB models
│   │   ├── Contact.js      # Contact model
│   │   └── Project.js      # Project model
│   ├── routes/             # API routes
│   │   ├── contacts.js     # Contact routes
│   │   └── projects.js     # Project routes
│   ├── config/             # Configuration files
│   │   └── db.js           # Database configuration
│   ├── package.json        # Server dependencies
│   ├── package-lock.json
│   └── server.js           # Main server file
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── README.md               # Project documentation
└── package.json            # Root package.json for running both
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd baho-africa
```

2. Install server dependencies:
```bash
cd server
npm install
cd ..
```

3. Install client dependencies:
```bash
cd client
npm install
cd ..
```

4. Create a `.env` file in the `server` directory with the following content:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
```

### Running the Application

**Development mode (separate terminals):**

1. Start the backend server:
```bash
cd server
npm run dev
```

2. Start the frontend client:
```bash
cd client
npm start
```

**Development mode (single command using concurrently):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

## 🌐 Available Scripts

In the project root directory:

- `npm run dev` - Runs both client and server in development mode
- `npm run server` - Runs only the server in development mode
- `npm run client` - Runs only the client in development mode
- `npm start` - Runs the production server

In the client directory:

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Runs tests
- `npm run eject` - Ejects from Create React App (irreversible)

In the server directory:

- `npm run dev` - Runs the server in development mode with nodemon
- `npm start` - Runs the server in production mode

## 🎨 Design Features

- Professional, minimal, creative, cultural, and inspirational theme
- Color scheme: dark blue, gold, white, and soft earthy tones
- Responsive design with mobile compatibility
- Hero image banners, icons, cards, and section dividers
- Material UI Grid, Cards, Typography, and Buttons
- Modern layout with African-inspired visual style

## 📄 Pages Available

1. **Home Page** - Hero section with tagline and CTAs
2. **About Us** - Organization overview, vision & mission
3. **What We Do** - Services displayed as Material UI cards
4. **Our Projects** - Project cards with descriptions
5. **Milestones / Impact** - Timeline UI for achievements
6. **Our Team** - Team members displayed in a grid
7. **Contact Page** - Contact form with Google Maps integration

## 🗄 Database Models

### Contact Model
- name (String, required)
- email (String, required)
- phone (String)
- subject (String, required)
- message (String, required)
- date (Date, default: now)

### Project Model
- title (String, required)
- description (String, required)
- startDate (Date, default: now)
- endDate (Date)
- status (String: active/completed/planned, default: planned)
- imageUrl (String)
- category (String)
- createdAt (Date, default: now)

## 🌍 API Endpoints

### Contacts
- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/:id` - Get specific contact
- `POST /api/contacts` - Create new contact

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get specific project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## 📱 Responsive Design

The website is fully responsive and mobile-compatible:

- Mobile-first approach
- Responsive grid layouts
- Adaptive navigation (hamburger menu on mobile)
- Touch-friendly buttons and interactions
- Properly scaled images and text for all devices

## 🧩 Features

- React Router navigation
- MongoDB integration for contact form submissions
- Form validation
- SEO-friendly structure
- Google Maps integration
- Timeline UI for milestones
- Professional UI/UX with Material Design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

For questions or support:
- Address: Northern Province, Musanze, Rwanda
- Phone: +250 782 558 395
- Email: bahoafrica@gmail.com
- Website: www.bahoafrica.com