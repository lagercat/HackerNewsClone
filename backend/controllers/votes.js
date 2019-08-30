const connection = require('../connection');
const ObjectID = require('mongodb').ObjectID;

exports.createVote = (req, res, next) => {
  const votesCollection = connection.db.collection('votes');
  const vote = {
    docType: parseInt(req.body.docType),
    docId: req.body.docId,
    date: new Date(),
    author: req.userData.Id,
  };
  if (!(req.body.docType == 0 || req.body.docType == 1)) {
    res.status(500).json({
      message: 'Invalid data',
    });
  } else {
    const collectionName = (req.body.docType == 0 ? 'comments' : 'posts');
    const documentCollection = connection.db.collection(collectionName);
    const documentId = new ObjectID(req.body.docId);
    documentCollection.findOne({_id: documentId}, (err, result) => {
      if (err) {
        res.status(500).json({
          message: err,
        });
      } else if (!result) {
        res.status(404).json({
          message: 'Object not found',
        });
      } else {
        votesCollection.insertOne(vote, (err, _) => {
          if (err) {
            res.status(500).json({
              message: err,
            });
          } else {
            result.points++;
            delete result._id;
            const document = {
              $set: result,
            };
            documentCollection.updateOne({_id: documentId}, document,
                (err, _2) => {
                  if (err) {
                    res.status(500).json({
                      message: err,
                    });
                  } else {
                    res.status(201).json({
                      message: 'Vote created',
                    });
                  }
                }
            );
          }
        });
      }
    });
  }
};

exports.deleteVote = (req, res, next) => {
  const collection = connection.db.collection('votes');
  const voteId = new ObjectID(req.params.id);
  collection.deleteOne({_id: voteId, author: req.userData.Id},
      (err, result) => {
        if (err) {
          res.status(500).json({
            message: err,
          });
        } else if (!result.deletedCount) {
          res.status(404).json({
            message: 'Vote not found',
          });
        } else {
          res.status(204).json({
            message: 'Vote deleted successfully',
          });
        }
      });
};
