import express, { Application} from "express";
import config from "./config";
import clientRoutes from "./routes/client.routes";
import errorHandler from "./middlewares/errorHandler";

export class App {

    private readonly app: Application

    constructor() {
        this.app = express()
        this.settings()
        this.middlewares()
        this.routes()

        this.app.use(errorHandler)
    }

    private settings() {
        this.app.set('port', config.port)
    }

    private middlewares() {
        this.app.use(express.json())
    }

    private routes() {
        this.app.use('/api/v1/clientes', clientRoutes)
    }

    public listen() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port ${this.app.get('port')}`)
        })
    }
}