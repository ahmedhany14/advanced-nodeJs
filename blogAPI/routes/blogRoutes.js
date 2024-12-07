const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const { clearCache } = require('../service/cache');
const Blog = mongoose.model('Blog');

module.exports = app => {
  app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req, res) => {
    const blogs = await Blog.find({ _user: req.user._id }).cache(); // .cache() is a custom function that we added to the mongoose Query prototype to make it cacheable

    res.send(blogs);
  });

  app.post('/api/blogs', requireLogin, async (req, res) => {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      _user: req.user._id
    });

    const key = JSON.stringify(Object.assign({}, { _user: req.user._id }, {
      collection: 'blogs'
    }));

    try {
      await blog.save();
      clearCache(key);
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });
};
