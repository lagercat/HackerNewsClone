const connection = require('../connection');

exports.postCreate = (req, res, next) => {
  const db = connection.db;
  const collection = db.collection('posts');
  if (req.body.title && req.body.content
    && (req.body.type == 1 || req.body.type == 0)) {
    const post = {
      title: req.body.title,
      content: req.body.content,
      type: req.body.type,
      author: req.body.author,
      date: new Date(),
    };
    collection.insertOne(post, (err, result) => {
      if (err) {
        res.status(500).json({
          message: err,
        });
      } else {
        res.status(201).json({
          message: 'Post created successfully',
        });
      }
    });
  } else {
    res.status(401).json({
      message: 'Invalid credentials',
    });
  }
};
