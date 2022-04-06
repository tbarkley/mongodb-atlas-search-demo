
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { connection } from './config/db_connection.mjs';

import MovieService from './service/movieService.mjs';
import MovieRepository from './repository/movieRepository.mjs';

import 'dotenv/config' 
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

let movieService = null;

/**
 * Return HTTP OK Response
 * 
 * @param {*} response 
 * @param {*} result 
 * @returns 
 */
const _HttpOK = (response, result) => {
    response.setHeader("Content-Type", "application/json");
    return response.json(result);
}

/**
 * Return HTTP BadRequest
 * 
 * @param {*} response 
 * @param {*} e 
 * @returns 
 */
const _HttpBadRequest = (response, e) => {
    return response.status(400).send({
        message: e.message,
        code: 400
     });
}

/**
 * Search movie database using search term provided by client
 */
server.get("/search", async (request, response) => {

    let query = request.query.q;
    
    let limit = request.query.limit,
        skip  = request.query.skip,
        includeFacets = request.query.includeFacets !== undefined ? request.query.includeFacets : false;

    try {
        let result = await movieService.search(query, limit, skip, includeFacets);
        return _HttpOK(response,result);
    } catch(e) {
        console.error(e.message);
        return _HttpBadRequest(response, e);
    }
});

/**
 * Gets all movies limited to 10 by default
 */
server.get("/browse", async (request, response) => {
    
    const skip  = parseInt(request.query.skip) || 0;
    const limit = parseInt(request.query.limit) || 10;

    try {
        let result = await movieService.getAllMovies(skip, limit);
        return _HttpOK(response,result);
    } catch(e) {
        console.error(e.message);
        return _HttpBadRequest(response, e);
    }
});

/**
 * Get a genre by genreId (Comedy|Drama|Action) etc
 */
server.get("/browse/genre/:genreId", async(request, response) => {

    const genreId  = request.params.genreId;

    try {
        let result = await movieService.getMoviesByGenre(genreId);
        return _HttpOK(response,result);
    } catch(e) {
        console.error(e.message);
        return _HttpBadRequest(response, e);
    }
});

/**
 * Get movie by MongoDB ObjectId
 */
server.get("/movies/:id", async (request, response) => {
    
    let id = request.params.id;
    try {
        let result = await movieService.getMovieById(id);
        return _HttpOK(response,result);
    } catch(e) {
        console.error(e.message);
        return _HttpBadRequest(response, e);
    }
});

/**
 * Setup service and repository
 */
const _init = async() => {
    let dbConnection = await connection();
    movieService = new MovieService(
        new MovieRepository(dbConnection)
    );
}

server.listen("3000", async () => {
    console.log("Server started on port: 3000");
    await _init();
});