import { createApp } from "./app.js";
import { MovieModel } from './models/MariaDB/movies.js'

createApp({ movieModel: MovieModel})