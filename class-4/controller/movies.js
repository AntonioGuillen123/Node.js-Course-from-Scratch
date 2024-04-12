import { MovieModel } from '../models/movies.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
    static async getAll(req, res) {
        const { genre } = req.query

        const movies = await MovieModel.getAll({ genre })

        res.json(movies)
    }

    static async getById(req, res) {
        const { id } = req.params

        const movie = await MovieModel.getById({ id })

        if (movie) {
            res.json(movie)
        } else {
            res.status(404).json({ message: 'Movie not found' })
        }
    }

    static async create(req, res) {
        const result = validateMovie(req.body)
        const resultStatus = result.success
        const resultData = result.data

        if (resultStatus) {
            const newMovie = await MovieModel.create(resultData)

            res.status(201).json(newMovie)
        } else {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
    }

    static async delete(req, res) {
        const { id } = req.params

        const isDelete = await MovieModel.delete({ id })

        isDelete ? res.json({ message: 'Movie deleted' }) : res.status(404).json({ message: 'Movie not found' })
    }


    static async update(req, res) {
        const result = validatePartialMovie(req.body)
        const resultStatus = result.success
        const resultData = result.data
        console.log(resultData)

        if (resultStatus) {
            const { id } = req.params

            const newMovie = await MovieModel.update({ id, data: resultData })

            newMovie ? res.json(newMovie) : res.status(404).json({ message: 'Movie not found' })
        } else {
            res.status(400).json({ error: JSON.parse(result.error.message) })
        }
    }
}