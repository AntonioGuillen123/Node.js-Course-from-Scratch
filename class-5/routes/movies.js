import { Router } from "express";
import { MovieModel } from "../models/MariaDB/movies.js";
import { MovieController } from "../controller/movies.js";

export const createMovieRouter = ({ movieModel }) => {
    const moviesRouter = Router()

    const movieController = new MovieController({ movieModel: MovieModel })

    moviesRouter.get('/', movieController.getAll)

    moviesRouter.get('/:id', movieController.getById)

    moviesRouter.post('/', movieController.create)

    moviesRouter.delete('/:id', movieController.delete)

    moviesRouter.patch('/:id', movieController.update)

    return moviesRouter
}