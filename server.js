const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const mysql = require('mysql2');
require('dotenv').config(); 


const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

// Database configuration (using mySQL)
const dbConfig = {
     host: 'localhost',
     user: 'root',
     password: 'MySQL1015',
   };
   const connection = mysql.createConnection(dbConfig);
   connection.connect((err) => {
     if (err) {
       console.error('MySQL connection error: ' + err.stack);
       return;
     }
     console.log('Connected to MySQL as id ' + connection.threadId);
   });