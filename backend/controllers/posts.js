const connection = require('../connection');
const ObjectID = require('mongodb').ObjectId;

const sortingTypes = ['hot', 'new', 'top'];
const timeIntervals = [1, 168, 720, 0]; // number of hours, 0 stands for all

exports.createPost = (req, res, next) => {
  const collection = connection.db.collection('posts');
  if (req.body.title && req.body.content
    && (req.body.type == 1 || req.body.type == 0)) {
    const post = {
      title: req.body.title,
      content: req.body.content,
      type: req.body.type,
      author: req.userData.userId,
      date: new Date(),
      points: 0,
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

exports.updatePost = (req, res, next) => {
  const collection = connection.db.collection('posts');
  if (req.body.title && req.body.content
    && (req.body.type == 1 || req.body.type == 0)) {
    const post = {
      $set: {
        title: req.body.title,
        content: req.body.content,
        type: req.body.type,
        author: req.userData.Id,
        date: req.body.data,
        points: req.body.points,
      },
    };
    const postId = new ObjectID(req.params.id);
    collection.updateOne({_id: postId, author: req.userData.Id}, post,
        (err, result) => {
          console.log(result);
          if (err) {
            console.log(err);
            res.status(500).json({
              message: err,
            });
          } else if (!result.modifiedCount) {
            res.status(404).json({
              message: 'Post not found',
            });
          } else {
            res.status(204).json({
              message: 'Post updated successfully',
            });
          }
        }
    );
  } else {
    res.status(401)({
      message: 'Invalid credentials',
    });
  }
};

exports.readPost = (req, res, next) => {
  const collection = connection.db.collection('posts');
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

exports.readPosts = (req, res, next) => {
  const collection = connection.db.collection('posts');
  const pageNumber = parseInt(req.query.page);
  const sortingType = req.query.sorting;
  const timeInterval = parseInt(req.query.interval);
  if (pageNumber <= 0 || !sortingTypes.includes(sortingType)
    || !timeIntervals.includes(timeInterval)) {
    res.status(401).json({
      message: 'Invalid credentials',
    });
  } else {
    const d = new Date();
    d.setHours(d.getHours() - timeInterval);
    const postsQuery = collection.find({
      'date': {$gte: (timeInterval == 0 ? new Date(0): d)},
    });
    switch (sortingType) {
      case 'new':
        postsQuery.sort({'date': -1});
        break;
      case 'top':
        postsQuery.sort({'points': -1});
        break;
      case 'hot':
        postsQuery.map((post) => {
          post.hotScore = parseInt(10 * Math.random()); // Will be changed
          return post;
        });
        break;
    }
    postsQuery.toArray((error, result) => {
      if (error) {
        res.status(500).json({
          message: error,
        });
      } else {
        if (sortingType == 'hot') {
          result.sort((a, b) => { // This sorting should be done at db level
            if (a.hotScore < b.hotScore) {
              return 1;
            } else {
              return -1;
            }
          });
        }
        res.status(200).json({
          message: 'Posts read successfully',
          posts: result,
        });
      }
    });
  }
};

exports.deletePost = (req, res, next) => {
  const collection = connection.db.collection('posts');
  const postId = new ObjectID(req.params.id);
  collection.deleteOne({_id: postId, author: req.userData.Id},
      (err, result) => {
        console.log(result);
        if (err) {
          res.status(500).json({
            message: err,
          });
        } else if (!result.deletedCount) {
          res.status(404).json({
            message: 'Post not found',
          });
        } else {
          res.status(204).json({
            message: 'Post deleted successfully',
          });
        }
      });
};
