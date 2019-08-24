const bcrypt = require('bcryptjs');
const connection = require('../connection');

exports.userCreate = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
      .then((hash) => {
        const db = connection.db;
        const collection = db.collection('users');
        collection.find({username: req.body.username})
            .limit(1).count().then( (userCount) => {
              if (userCount > 0) {
                res.status(401).json({
                  message: 'Username already taken',
                });
              } else {
                const user = {
                  username: req.body.username,
                  password: hash,
                  points: 0,
                };
                collection.insertOne(user, (err, result) => {
                  res.status(201).json({
                    message: 'User created successfully',
                  });
                });
              }
            });
      });
};
