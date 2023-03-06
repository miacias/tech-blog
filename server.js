// ----- NECESSARY IMPORTS -----
// express.js
const express = require('express');
const session = require('express-session');
// express routes
const path = require('path'); 
const routes = require('./controllers');
// handlebars.js
const xpHandlebars = require('express-handlebars');
const helpers = require('./utils/helpers');
// environment variables
require('dotenv').config();
// sequelize
const sequelize = require('./config/connection.js');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;
// enables Handlebars helpers
const hbs = xpHandlebars.create({ helpers });


const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize // connects cookies to Sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // allows public folder relative path

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});