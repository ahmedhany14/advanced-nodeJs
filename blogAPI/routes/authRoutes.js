const mongoose = require('mongoose');
const User = mongoose.model('User');
module.exports = app => {
  app.post(
    '/login',
    async (req, res, next) => {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).send({ error: 'You must provide email and password' });
      }

      const user = await User.findOne({
        email: email,
        password: password
      })

      if (!user) {
        return res.status(400).send({ error: 'Invalid email or password' });
      }
      req.session = {
        user
      };
      res.status(200).send(user);
    }
  );

  app.post('/register',

    async (req, res, next) => {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).send({ error: 'You must provide email and password' });
      }

      const user = new User({
        email: email,
        password: password
      });

      try {
        await user.save();
        res.status(200).send(user);
      } catch (err) {
        res.status(400).send(err);
      }
    }
  )

  app.get('/logout', (req, res) => {
    res.user = undefined;
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
