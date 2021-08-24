const mongoose = require('mongoose');

const setupDB = () => {
  mongoose
    .connect(
      'mongodb+srv://Balu:7E8LK8P99Lp4P0Gg@cluster0.hagxy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    )
    //.connect('mongodb://localhost:27017/ticket-master1')
    .then(() => {
      console.log('connected to db');
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = setupDB;
