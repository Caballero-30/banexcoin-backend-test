import { Pool } from "pg";
import { pool } from "../database/database";
import { Client } from "../models/client";
import queries from "../database/queries.json"

class ClientsRepository {

    private readonly db: Pool

    constructor() {
        this.db = pool
    }

    public async addClient(client: Client): Promise<number> {
        const queryResult = await this.db.query(
            queries.Insert,
            [client.firstName, client.lastName, client.birthdate, client.address, client.status]
        )

        return queryResult.rows[0].insertclient
    }

    public async updateClient(client: Client): Promise<Date | undefined> {
        const queryResult = await this.db.query(
            queries.Update,
            [client.id, client.firstName, client.lastName, client.birthdate, client.address, client.status]
        )

        return queryResult.rows[0].updateclient
    }

    public async getClients() {
        const queryResult = await this.db.query<Client>(queries.Select);
        return queryResult.rows
    }

    public async getClientById(id: number): Promise<Client | undefined> {
        const queryResult = await this.db.query<Client>(
            queries.SelectOne,
            [id]
        )

        return queryResult.rows[0]
    }
}

export default new ClientsRepository()