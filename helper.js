import bcrypt from "bcrypt";
import { client } from "./index.js";
import {ObjectId} from "mongodb";

async function updateMovieByName(name, request) {
  const result = await client
    .db("b27rwd")
    .collection("movies")
    .updateOne({ name: name }, { $set: request.body });
  return result;
}

async function getMovieByName(name) {
  return await client
    .db("b27rwd")
    .collection("movies")
    .findOne({ name: name });
}

async function getUserByName(name) {
  return await client
    .db("b27rwd")
    .collection("users")
    .findOne({ name: name });
}

async function getMovies(filter) {
  const movies = await client
    .db("b27rwd")
    .collection("movies")
    .find(filter)
    .toArray();
  return movies;
}

  async function getMovieById(id) {
  const movie = await client
    .db("b27rwd")
    .collection("movies")
    .findOne({ _id: ObjectId(id) });
  return movie;
}
async function createMovie(data) {
    const  result = await client
      .db("b27rwd")
      .collection("movies")
      .insertMany(data);
    return result;
}

async function createUser(data) {
  const  result = await client
    .db("b27rwd")
    .collection("users")
    .insertOne(data);
  return result;
}

  async function deleteMovieById(id) {
    const movie = await client
      .db("b27rwd")
      .collection("movies")
      .deleteOne({ _id: ObjectId(id) });
    return movie;
  }

  async function genPassword(password) {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    return hashedPassword;
  }

  export {
    updateMovieByName,
    getMovieByName,
    getMovies,
    getMovieById,
    createMovie,
    deleteMovieById,
    genPassword,
    getUserByName,
    createUser,
  };