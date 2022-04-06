const baseUrl = "http://localhost:3000"

export default class MovieService {
    browse(skip=0,limit=20) {
        return fetch(`${baseUrl}/browse/?skip=${skip}&limit=${limit}`).then(res => res.json()).then(d => d.data);
    }

    search(q="",limit=10, skip=0, includeFacets=false) {
        return fetch(`${baseUrl}/search?q=${q}&skip=${skip}&limit=${limit}&includeFacets=${includeFacets}`).then(res => res.json()).then(d => d.data);
    }

    getById(id) {
        return fetch(`${baseUrl}/movies/${id}`).then(res => res.json()).then(d => d.data);
    }

    getByGenre(genre) {
        return fetch(`${baseUrl}/browse/${genre}`).then(res => res.json()).then(d => d.data);
    }
}