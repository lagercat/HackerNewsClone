const connection = require('../connection');
const ObjectID = require('mongodb').ObjectID;


exports.commentCreate = (req, res, next) => {
  const commentsCollection = connection.db.collection('comments');
  const postsCollection = connection.db.collection('posts');
  if (req.body.postId && req.body.content) {
    const postId = new ObjectID(req.body.postId);
    postsCollection.findOne({_id: postId}, (err, result) => {
      if (err) {
        res.status(500).json({
          message: 'Invalid data',
        });
      } else if (!result) {
        res.status(404).json({
          message: 'Post not found',
        });
      } else {
        const comment = {
          content: req.body.content,
          postId: req.body.postId,
          parentId: req.body.parrentId,
          author: req.userData.userId,
          date: new Date(),
          points: 0,
        };
        if (req.body.parentId) {
          const parentId = new ObjectID(req.body.parrentId);
          commentsCollection.findOne({_id: parentId}, (err, result) => {
            if (err) {
              res.status(500).json({
                message: err,
              });
            } else if (!result || (result.postId != req.body.postId)) {
              res.status(404).json({
                message: 'Comment not found',
              });
            } else {
              commentsCollection.insertOne(comment, (err, result) => {
                if (err) {
                  res.stastus(500).json({
                    message: err,
                  });
                } else {
                  res.status(201).json({
                    message: 'Comment added successfully',
                  });
                }
              });
            }
          });
        } else {
          commentsCollection.insertOne(comment, (err, result) => {
            if (err) {
              res.stastus(500).json({
                message: err,
              });
            } else {
              res.status(201).json({
                message: 'Comment added successfully',
              });
            }
          });
        }
      }
    });
  } else {
    res.status(500).json({
      message: 'Invalid data',
    });
  }
};

exports.commentDelete = (req, res, next) => {
  const commentsCollection = connection.db.collection('comments');
  const commentId = new ObjectID(req.params.id);
  commentsCollection.deleteOne({_id: commentId, author: req.userData.userId},
      (err, result) => {
        if (err) {
          res.status(500).json({
            message: err,
          });
        } else if (!result.deletedCount) {
          res.status(404).json({
            message: 'Comment not found',
          });
        } else {
          commentsCollection.deleteMany({parentId: req.params.id},
              (err, result) => {
                if (err) {
                  res.status(500).json({
                    message: err,
                  });
                } else {
                  res.status(204).json({
                    message: 'Post deleted successfully',
                  });
                }
              }
          );
        }
      });
};
