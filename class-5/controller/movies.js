//import { this.movieModel } from '../models/local-file-system/movies.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
    constructor({ movieModel}){
        this.movieModel = movieModel
    }

    getAll = async (req, res) => {
        const { genre } = req.query

        const movies = await this.movieModel.getAll({ genre })

        if(movies.length !== 0){
            res.json(movies)
        }else{
            res.status(404).json({ message: 'Gender does not exist' })
        }

    }

    getById = async (req, res) => {
        const { id } = req.params

        const movie = await this.movieModel.getById({ id })

        if (movie) {
            res.json(movie)
        } else {
            res.status(404).json({ message: 'Movie not found' })
        }
    }

    create = async (req, res) => {
        const result = validateMovie = async (req.body)
        const resultStatus = result.success
        const resultData = result.data

        if (resultStatus) {
            const newMovie = await this.movieModel.create(resultData)

            res.status(201).json(newMovie)
        } else {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
    }

    delete = async (req, res) => {
        const { id } = req.params

        const isDelete = await this.movieModel.delete({ id })

        isDelete ? res.json({ message: 'Movie deleted' }) : res.status(404).json({ message: 'Movie not found' })
    }


    update = async (req, res) => {
        const result = validatePartialMovie = async (req.body)
        const resultStatus = result.success
        const resultData = result.data

        if (resultStatus) {
            const { id } = req.params

            const newMovie = await this.movieModel.update({ id, data: resultData })

            newMovie ? res.json(newMovie) : res.status(404).json({ message: 'Movie not found' })
        } else {
            res.status(400).json({ error: JSON.parse(result.error.message) })
        }
    }
}

