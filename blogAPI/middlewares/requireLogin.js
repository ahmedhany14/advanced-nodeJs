module.exports = (req, res, next) => {
  if (req.session.user) {
    req.user = req.session.user;
  }
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }

  next();
};
