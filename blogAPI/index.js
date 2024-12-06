const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const dotenv = require('dotenv');

dotenv.config({
  path: '.conf.env',
});

require('./models/User');
require('./models/Blog');
require('./service/cache')

const connectDB = async () => {
  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(process.env.MONGO_URI, {
    });
    console.log('Database connected successfully')
  } catch (err) {
    console.log(err);
  }
}

connectDB();
const app = express();

app.use(express.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.get('/',
  (req, res) => {
    res.send('home');
  }
)

require('./routes/authRoutes')(app);
require('./routes/blogRoutes')(app);

if (['production'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
  console.log(`hit http://localhost:${PORT}`);
});
