const MongoClient = require('mongodb').MongoClient;

class Connection {
  static connectToMongo() {
    if (this.db) return Promise.resolve(this.db);
    return MongoClient.connect(this.url, this.options)
        .then((db) => {
          console.log('Connected to database!');
          this.db = db;
        }).catch((error) => {
          console.log(errors);
        });
  }
}

Connection.db = null;
Connection.url = 'mongodb://127.0.0.1:27017/hacker_news';
Connection.options = {
  bufferMaxEntries: 0,
  reconnectTries: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = Connection;
