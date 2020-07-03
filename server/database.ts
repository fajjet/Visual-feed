// @ts-ignore
import mongoose from 'mongoose';

const connection = process.env.DB_URL || '';

mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  .then(() => console.log("Database Connected Successfully"))
  .catch((err: any) => console.log(err));
