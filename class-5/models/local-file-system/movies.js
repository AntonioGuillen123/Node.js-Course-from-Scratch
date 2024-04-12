import { createRequire } from 'node:module'
import { randomUUID } from 'node:crypto'

const require = createRequire(import.meta.url)
const movies = require('../../movies.json')

export class MovieModel {
    static async getAll({ genre }) {
        let filteredMovies = movies

        if (genre) {
            filteredMovies = movies.filter(
                movie => movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
            )
        }

        return filteredMovies
    }

    static async getById({ id }) {
        const movie = movies.filter((movie) => movie.id === id)

        return movie
    }

    static async create(data) {
        // en base de datos
        const newMovie = {
            id: randomUUID(), // uuid v4
            ...data
        }

        // Esto no sería REST, porque estamos guardando
        // el estado de la aplicación en memoria
        movies.push(newMovie)

        return newMovie
    }

    static async delete({ id }) {
        const movieIndex = movies.findIndex((movie) => movie.id === id)
        let isDelete = false

        if (movieIndex !== -1) {
            movies.splice(movieIndex, 1)

            isDelete = true
        }

        return isDelete
    }

    static async update({ id, data }) {
        const movieIndex = movies.findIndex((movie) => movie.id === id)
        let updateMovie

        if (movieIndex !== -1) {
            updateMovie = {
                ...movies[movieIndex],
                ...data
            }

            movies[movieIndex] = updateMovie
        }

        return updateMovie
    }
}