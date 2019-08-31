const bcrypt = require('bcryptjs');
const PasswordValidator = require('password-validator');
const jwt = require('jsonwebtoken');
const connection = require('../connection');

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
      .then((hash) => {
        const db = connection.db;
        const collection = db.collection('users');
        collection.find({username: req.body.username})
            .count().then( (userCount) => {
              const schema = new PasswordValidator();
              schema
                  .is().min(8)
                  .is().max(100)
                  .has().not().spaces()
                  .has().digits();
              if (userCount > 0) {
                res.status(401).json({
                  message: 'Username already taken',
                });
              } else if (!req.body.username || !req.body.password
                || !schema.validate(req.body.password)) {
                res.status(401).json({
                  message: 'Invalid credentials',
                });
              } else {
                const user = {
                  username: req.body.username,
                  password: hash,
                  points: 0,
                };
                collection.insertOne(user, (err, result) => {
                  if (err) {
                    res.status(500).json({
                      message: err,
                    });
                  } else {
                    res.status(201).json({
                      message: 'User created successfully',
                      user: result.ops[0],
                    });
                  }
                });
              }
            });
      });
};

exports.loginUser = (req, res, next) => {
  const db = connection.db;
  const collection = db.collection('users');
  collection.findOne({username: req.body.username}).then((dbUser) => {
    if (!dbUser) {
      res.status(401).json({
        message: 'Wrong username',
      });
    } else {
      bcrypt.compare(req.body.password, dbUser.password).then(
          (result) => {
            if (!result) {
              res.status(401).json({
                message: 'Wrong password',
              });
            }
            const token = jwt.sign({
              username: dbUser.username,
              Id: dbUser._id,
            }, 'some_secret_key', {
              expiresIn: '1h',
            });
            res.status(200).json({
              token: token,
              message: 'Login successful',
              user: dbUser,
            });
          }
      );
    }
  });
};
