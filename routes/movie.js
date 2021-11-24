import express from "express";
import {
  createMovie,
  deleteMovieById,
  getMovieById,
  getMovieByName,
  getMovies,
  updateMovieByName,
} from "../helper.js";

const router = express.Router();


 router.get("/", async (request,response) => {
     console.log(request.query);
     let filter = request.query;
    
    if(filter.rating){
       filter.rating = parseInt(filter.rating);
    }
    const movies = await getMovies(filter);
 
    response.send(movies);
    
 });
 
 router.put("/", async (request,response) => {
    const { name } = request.query;

    console.log(request.query, request.body);
    await updateMovieByName(name, request);
    const movie = await getMovieByName(name);
    response.send(movie);
 });


  
 router.get("/:id", async (request,response) => {
    const { id } = request.params;
    const movie = await getMovieById(id);

    response.send(movie || { message: "No matching movies" });
 });




 router.delete("/:id", async (request,response) => {
    const { id }= request.params;
    const movie = await deleteMovieById(id);
    response.send(movie || { message: "No matching movies" });
 });
 

 
 router.post("/", async (request,response) => {
    const data = request.body;
    const result = await createMovie(data);
    response.send(result);
 });
 
 
 export const movieRouter = router;