const MongoClient = require('mongodb').MongoClient;

class Connection {
  static connectToMongo() {
    if (this.db) return Promise.resolve(this.db);
    return MongoClient.connect(this.url, this.options,
        (err, client) => {
          if (err) {
            throw err;
          }
          console.log('Connected to database!');
          this.db = client.db(this.db_name);
        });
    /*
        .then((err, client) => {
          console.log('Connected to database!');
          this.db = clien.db
        }).catch((error) => {
          console.log(errors);
        });
    */
  }
}

Connection.db = null;
Connection.url = 'mongodb://127.0.0.1:27017';
Connection.db_name = 'hacker_news';
Connection.options = {
  bufferMaxEntries: 0,
  reconnectTries: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = Connection;
