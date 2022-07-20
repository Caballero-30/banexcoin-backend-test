import { config } from 'dotenv'

config()

export default {
    port: process.env.PORT || 8080,
    database: {
        name: process.env.PG_DATABASE!!,
        port: parseInt(process.env.PG_PORT!!),
        host: process.env.PG_HOST!!,
        user: process.env.PG_USER!!,
        password: process.env.PG_PASSWORD!!
    }
}