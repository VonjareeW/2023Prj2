const express = require('express');
const session = require('express-session');
const expressHandlebars = require('express-handlebars');
const path = require('path');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const User = require('./models/User');

const app = express();

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
    expiration: 24 * 60 * 60 * 1000, // The maximum age (in milliseconds) of a valid session.
  }),
};
app.use(session(sess));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));


app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve CSS
app.get('/assets/css/style.css', (req, res) => {
  res.type('text/css');
  res.sendFile(path.join(__dirname, 'public', 'assets', 'css', 'styles.css'));
});

// Authentication routes
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

// Routes for events and goals (you can define these routes)
const eventRoutes = require('./routes/event');
const goalRoutes = require('./routes/goal');
app.use('/event', eventRoutes); // Prefix for event routes
app.use('/goal', goalRoutes);  // Prefix for goal routes


/*
// Database configuration (using mySQL)
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Tommy@613',
};

const connection = require('mysql2').createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('MySQL connection error: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});
*/

/*
//signup
app.post('/register', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (userData) {
      res.status(400).json({ message: 'User already exists. Please log in.' });
      return;
    }

   // Create a new user
   const newUser = await User.create({
    email: req.body.email,
    password: req.body.password,
  });

  // Set the user's session
  req.session.user_id = newUser.id;
  req.session.logged_in = true;
  req.session.save(() => {
    res.json({ user: newUser, message: 'You are now registered and logged in!' });
  });
} catch (err) {
  console.error(err);
  res.status(500).json({ message: 'Server error during registration.' });
}
});
*/

/*
//login
app.post('/login', async (req, res) => {
  try {
    const userData = await User.findOneByEmail(req.body.email);

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ success: true, user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});
*/

/*
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
*/

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
