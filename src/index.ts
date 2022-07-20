import { connectPool} from "./database/database";
import { App } from "./app";

function main() {
    connectPool()

    new App().listen()
}

main()