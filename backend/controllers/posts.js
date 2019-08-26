const connection = require('../connection');
const ObjectID = require('mongodb').ObjectId;

exports.createPost = (req, res, next) => {
  const db = connection.db;
  const collection = db.collection('posts');
  if (req.body.title && req.body.content
    && (req.body.type == 1 || req.body.type == 0)) {
    const post = {
      title: req.body.title,
      content: req.body.content,
      type: req.body.type,
      author: req.userData.userId,
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
          id: result.insertedId,
        });
      }
    });
  } else {
    res.status(401).json({
      message: 'Invalid credentials',
    });
  }
};

exports.readPost = (req, res, next) => {
  const db = connection.db;
  const collection = db.collection('posts');
  const postId = new ObjectID(req.params.id);
  collection.findOne({_id: postId}, (err, result) => {
    if (err) {
      res.status(500).json({
        message: err,
      });
    } else if (!result) {
      res.status(404).json({
        message: 'Post not found',
      });
    } else {
      res.status(200).json({
        message: 'Post received successfully',
        post: result,
      });
    }
  });
};

exports.deletePost = (req, res, next) => {
  const db = connection.db;
  const collection = db.collection('posts');
  const postId = new ObjectID(req.params.id);
  collection.findOne({_id: postId}, (err, result) => {
    if (err) {
      res.status(500).json({
        message: err,
      });
    } else if (!result) {
      res.status(404).json({
        message: 'Post not found',
      });
    } else if (result.author != req.userData.userId) {
      res.status(403).json({
        message: 'Cannot delete post',
      });
    } else {
      collection.deleteOne({_id: postId}, (err, result) => {
        if (err) {
          res.status(500).json({
            message: err,
          });
        } else {
          res.status(204).json({
            message: 'Post deleted successfully',
          });
        }
      });
    }
  });
};
