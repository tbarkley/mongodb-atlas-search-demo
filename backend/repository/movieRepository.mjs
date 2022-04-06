import { ObjectId } from 'mongodb';

export default class MovieRepository {

  _dbConnection = null;
  _collectionName = "movies";

  /**
   * @constructor
   * @param dbConnection {MongoDB Connection Object}
   */
  constructor(dbConnection) {
    this._dbConnection = dbConnection;
  }

  /**
   * 
   * Get all genres available for searching by
   * 
   * @returns {Array} - Array of {string} genres
   */
  async getAllGenres() {
    let query = [{ $unwind: '$genres' }, {
      $group: {
        _id: '$genres',
        tags: {
          $sum: 1
        }
      }
    }];
    return await this._executeAggregateQuery(query);
  }

  /**
   * 
   * Get all movies limited by 10 results by default
   * 
   * @param skip {number}
   * @param limit {number}
   * @returns {Array} - Array of movies
   */
  async getAllMovies(skip = 0, limit = 10) {
    let query = [
      { $match: {} },
      {
        $project: this._getDefaultProjection()
      },

      {
        $sort: {
          title: 1
        }
      },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          totalCount: [
            {
              $count: 'count'
            }
          ]
        }
      }
    ];
    return await this._executeAggregateQuery(query);
  };

  /**
   * 
   * Get all movies given a certain genre
   * 
   * @param genre {string} - Name of genre to search by e.g., (Comedy|Drama|Action) etc
   * @returns {Array} - Array of movies by genre
   */
  async getMoviesByGenre(genre) {
    let query = [{
      $match: {
        "genres": genre
      }
    }, {
      $project: this._getDefaultProjection()
    },
    {
      $sort: {
        score: -1
      }
    },
    {
      $limit: 20
    }
    ];
    return await this._executeAggregateQuery(query);
  }

  /**
   * 
   * Use MongoDB Aggregation pipeline to query the DB
   * 
   * @param query {Array} - Array to use for aggregate pipeline
   * @returns 
   */
  async _executeAggregateQuery(query) {
    try {
      let result = await this._dbConnection
        .collection(this._collectionName)
        .aggregate(query).toArray();

      return result[0];

    } catch (e) {
      console.error(e);
    }
  }

  _getDefaultProjection() {
    return {
      title: 1,
      genres: 1,
      cast: 1,
      runtime : 1,
      directors : 1,
      rated:1,
      year: 1,
      plot: 1,
      poster: 1,
      score: { $meta: "searchScore" }
    };
  }

  /**
   * Get a movie by MongoDB ObjectId
   * 
   * @param id {string} - MongoDB ID
   */
  async getMovieById(id = null) {
    let query = { _id: ObjectId(id) };
    let result = this._dbConnection.collection.findOne(query);
    console.log(result);
  };

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
  async search(q = "", limit = 10, skip = 0, includeFacets = false) {
    let query = [{
      $search: {
        index: 'default',
        text: {
          query: q,
          path: {
            wildcard: "*"
          }
        }
      }
    },
    {
      $project:this._getDefaultProjection()
    }, {
      $sort: {
        score: -1
      }
    },
    {
      $facet: {
        data: [{ $skip: skip }, { $limit: limit }],
        responseMeta: [
          {
            $count: 'count'
          }
        ]
      }
    }
    ];
    return await this._executeAggregateQuery(query);
  };
}