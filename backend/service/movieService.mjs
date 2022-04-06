export default class MovieService {
    
    _repo = null;

    constructor(repository) {
        this._repo = repository;
    }

    /**
     * 
     * Get all movies limited to 10
     * 
     * @param skip {number}  - Amount of records to skip
     * @param limit {number} - Limited amount of records to return
     * @returns {Array} - Movies 
     */
    async getAllMovies(skip=0, limit=10) {

        if(skip < 0 || limit < 0) {
            throw new Error("Invalid parameters");
        }
        return await this._repo.getAllMovies(skip, limit);
    }

    /**
     * Get all genres
     * 
     * @returns {Array} - Genres
     */
    async getAllGenres() {
        return await this._repo.getAllGenres();
    }

    /**
     * Get all movies in given genre
     * 
     * @param genre {string} - The genre name to find movies by
     * @returns {Array} - Movies by genre
     */
    async getMoviesByGenre(genre) {
        
        if(!genre) {
            throw new Error("Genre cannot be empty");
        }

        genre = genre.charAt(0).toUpperCase() + genre.slice(1)

        return await this._repo.getMoviesByGenre(genre);
    }

    /**
     * Get a movie by it's ID
     * 
     * @param id {ObjectId()} - Mongo ObjectId for movie
     * @returns {Object}
     */
    async getMovieById(id) {
        if(!id) {
            throw new Error("Movie ID cannot be empty");
        }
        return await this._repo.getMovieById(id);
    }

    /**
     * 
     * Search for a movie by search term
     * 
     * @param q {string} - The search term
     * @param limit {number} - Maximum number of records to return
     * @param skip {number}  - Amount of records to skip 
     * @param includeFacets {boolean} - Include facets in results
     * @returns {Array} - Movies search results
     */
    async search(q="", limit=10, skip=0, includeFacets=false) {
        
        let limit, skip, includeFacets;

        try {
            limit = parseInt(request.query.limit);
            skip  = parseInt(request.query.skip);
            includeFacets = request.query.includeFacets !== undefined ? request.query.includeFacets : false;
        } catch(e) {
            throw new Error("Invalid search parameters used:" + e.message);
        }

        if(q.trim() === "") {
            throw new Error("Invalid search parameters used");
        }
        return await this._repo.search(q, limit, skip, includeFacets);
    }
}