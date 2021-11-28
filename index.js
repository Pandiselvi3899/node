import dotenv from "dotenv";
import  express  from "express";     
import { MongoClient } from "mongodb";
import { movieRouter } from "./routes/movie.js";
import { userRouter } from "./routes/users.js";
import cors from "cors";

dotenv.config();

// console.log(process.env);
console.log(process.env);

const app = express();

app.use(express.json()); 
   
app.use(cors());

const PORT= process.env.PORT || 9000;

// const MONGO_URL="mongodb://localhost";

const MONGO_URL=process.env.MONGO_URL;

   export async function createConnection() {
   const client=new MongoClient(MONGO_URL);
   await client.connect()
   console.log("MongoDB Connected");

return client;

}

const client = await createConnection();
    

app.get("/",(request,response)=>{
    response.send("Hello , 🌎 !!! 😉");
});

app.use("/movies", movieRouter);
app.use("/users", userRouter);

app.listen(PORT, () => console.log("Server is started at port",PORT));

export{client};


