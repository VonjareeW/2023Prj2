const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressHandlebars = require('express-handlebars');
const mysql = require('mysql2');
const app = express();

app.use(express.static('public'));

// Configure Handlebars
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express Session Middleware
app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true
}));

// Authentication routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Routes
const eventRoutes = require('./routes/event');
const goalRoutes = require('./routes/goal');
app.use('/event', eventRoutes); // Prefix for event routes
app.use('/goal', goalRoutes); // Prefix for goal routes

// Database configuration (using mySQL)
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Tommy@613',
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('MySQL connection error: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

//logout
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          console.error('Error destroying session:', err);
          res.status(500).json({ message: 'Failed to logout' });
      } else {
          res.status(200).json({ message: 'Logout successful' });
      }
  });
});


// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
