const express=require('express');
const graphqlHTTP=require('express-graphql').graphqlHTTP;
const schema=require('./schema/schema');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
app.use(cors())
mongoose
  .connect("mongodb://abdelhakboulebtina:kawanorsh13@cluster0-shard-00-00.aoglv.mongodb.net:27017,cluster0-shard-00-01.aoglv.mongodb.net:27017,cluster0-shard-00-02.aoglv.mongodb.net:27017/bookPlaylist?ssl=true&replicaSet=atlas-rs2j0r-shard-0&authSource=admin&retryWrites=true&w=majority")
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use('/graphql',graphqlHTTP({
schema,
graphiql:true,
}));
app.listen(4000,()=>{
    console.log('now listening for requests on port 4000 ');
})