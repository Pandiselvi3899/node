import express from "express";
import { createUser, genPassword, getUserByName } from "../helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.route("/signup").post(async (request,response) => {
    const { username, password } = request.body;
    
    const isUserExist = await getUserByName(username);

    console.log(isUserExist);
    if (isUserExist) {
        response.status(400).send({ message: "username already exists" });
        return;
    }
    
    // min 8 chars

    if (password.length < 8) {
        response.status(400).send({ message: "Password must be longer" });
        return;
    }
 
    //pattern matching
      
    if (
        !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g.test(password)
    ) {
        response.status(400).send({ message: "Password pattern does not match" });
        return;
    }

   //save the user
    const hashedPassword = await genPassword(password);
    const result = await createUser({
        username: username, 
        password: hashedPassword,
    });
        
    console.log(hashedPassword,result);
    response.send(result);
 });


 router.route("/login").post(async (request,response) => {
    const { username, password } = request.body;

    const userFromDB = await getUserByName(username);
    
    console.log(userFromDB)

  //check for username
    if (!userFromDB) {
        response.status(401).send({ message: "Invalid credentials" });
        return;
    }

    const storedDbPassword = userFromDB.password;

   //check for password

    const isPasswordMatch= await bcrypt.compare(password,storedDbPassword);
    
 if(isPasswordMatch){
     //unique value and secret key
     const token = jwt.sign({ id:userFromDB._id },process.env.SECRET_KEY);
     response.send({ message:"Successfull login", token: token });
 } else {
     response.status(401).send({ message: "Invalid credentials" });
 
 }
    
});

 
 export const userRouter = router;
