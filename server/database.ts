// @ts-ignore
import mongoose from 'mongoose';
const dbName = 'app';

const connection = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster-p0dww.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  .then(() => console.log("Database Connected Successfully"))
  .catch((err: any) => console.log(err));
