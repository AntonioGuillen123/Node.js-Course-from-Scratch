import mysql from 'mysql2/promise'

const configDB = {
    host: 'localhost',
    user: 'root',
    password: 'P@ssw0rd',
    database: 'moviesdb'
}

const connection = await mysql.createConnection(configDB)

export class MovieModel {
    static async getAll({ genre }) {
        let movies
        let queryGenre = ``

        if (genre) {

            try {
                const genreLowerCase = genre.toLowerCase()

                const [genres] = await connection.query('SELECT * FROM genre WHERE LOWER(name) = ?;', [genreLowerCase])

                const [{ id }] = genres

                const [moviesID] = await connection.query('SELECT movie_id FROM movie_genre WHERE genre_id = ?;', [id])

                const moviesIDMaped = moviesID.map(movie => {
                    return `UNHEX('${movie.movie_id.toString('hex')}')`
                })

                queryGenre = `WHERE id IN (${moviesIDMaped.join(', ')})`

            } catch (err) {
                console.error(err)

                queryGenre = `WHERE id = 'default'`
            }
        }

        try {
            [movies] = await connection.query(`SELECT HEX(id) id, title, year, director, duration, poster, rate FROM movie ${queryGenre};`)
        } catch (err) {
            console.error(err)
        }

        return movies
    }

    static async getById({ id }) {
        const idUpperCase = id.toUpperCase()

        const [movies] = await connection.query('SELECT HEX(id) id, title, year, director, duration, poster, rate FROM movie WHERE id = UNHEX(?);', [idUpperCase])

        return movies.length !== 0 ? [movies] : undefined
    }

    static async create(data) {
        const [uuids] = await connection.query('SELECT REPLACE(UUID(),"-", "") uuid;')
        const [{ uuid }] = uuids
        const {
            title,
            year,
            director,
            duration,
            poster,
            rate
        } = data

        const result = await connection.query(`INSERT INTO movie (id, title, year, director, duration, poster, rate)
                VALUES ( UNHEX('${uuid}'), ?, ?, ?, ?, ?, ? );`, [title, year, director, duration, poster, rate])

        return await MovieModel.getById({ id: uuid })
    }

    static async delete({ id }) {
        const idUpperCase = id.toUpperCase()

        await connection.query('DELETE FROM movie_genre WHERE movie_id = UNHEX(?);', [idUpperCase])

        const [result] = await connection.query('DELETE FROM movie WHERE id = UNHEX(?);', [idUpperCase])
        const affectedRows = result.affectedRows

        return affectedRows > 0
    }

    static async update({ id, data }) {
        const idUpperCase = id.toUpperCase()

        const query = Object.keys(data).map((key) => `${key}=?`).join(', ')
        
        await connection.query(`UPDATE movie SET ${query} WHERE id = UNHEX(?);`, [Object.values(data), idUpperCase])
        
        return await MovieModel.getById({ id })
    }
}