const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('database connection successful!!!');
  })
  .catch((err) => {
    console.log('database connection failed!!');
  });
