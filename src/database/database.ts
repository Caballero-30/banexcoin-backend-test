import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
    database: config.database.name,
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password
})

export function connectPool() {
    pool.connect((err, client, _done) => {
        if (err) {
            console.error(err)
            return
        }

        console.log('Connected to', (client as any).connectionParameters.database)
    })
}