module.exports = {
  url: 'mongodb://localhost:27017/employee'
}


// module.exports = {
//     url: 'mongodb+srv://root:root@cluster0-k4vwy.mongodb.net/test?retryWrites=true&w=majority/myDb'
// }
/* 
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://root:<password>@cluster0-k4vwy.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
}); */
