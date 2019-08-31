const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorizations.split(' ')[1];
    const decodedToken = jwt.verify(token, 'some_secret_ley');
    req.userData = {
      username: decodedToken.username,
      id: decodedToken.id,
    };
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Invalid token',
    });
  }
};
