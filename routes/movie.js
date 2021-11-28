import express from "express";
import {
  createMovie,
  deleteMovieById,
  getMovieById,
  getMovieByName,
  getMovies,
  updateMovieByName,
} from "../helper.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();


 router
 .route("/")
 .get( auth, async (request,response) => {
     console.log(request.query);
     let filter = request.query;
    
    if(filter.rating){
       filter.rating = parseInt(filter.rating);
    }
    const movies = await getMovies(filter);
    response.send(movies);
    
 })
 
  .put(auth,async (request,response) => {
    const { name } = request.query;
    console.log(request.query, request.body);
    await updateMovieByName(name, request);
    const movie = await getMovieByName(name);
    response.send(movie);
 })


 .post( async (request, response) => {
   const data = request.body;
   const result = await createMovie(data);
   response.send(result);
});

router
.route("/:id")
.get(auth, async (request, response) => {
   const { id } = request.params;
   const movie = await getMovieById(id);
   response.send(movie || { message: "No matching movies" });
})


 .delete(async (request, response) => {
    const { id } = request.params;
    const movie = await deleteMovieById(id);
    response.send(movie || { message: "No matching movies" });
 });
 
 export const movieRouter = router;