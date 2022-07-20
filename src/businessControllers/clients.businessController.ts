import clientsRepository from "../repositories/clients.repository";
import { Client } from "../models/client";

class ClientsBusinessController {

    public async createClient(client: Client) {
        const id = await clientsRepository.addClient(client);
        return new Client(
            id,
            client.created,
            client.updated,
            client.status,
            client.firstName,
            client.lastName,
            client.address,
            client.birthdate
        )
    }

    public async editClient(client: Client): Promise<Client | undefined> {
        const creationDate = await clientsRepository.updateClient(client);
        return creationDate
            ? new Client(
                client.id,
                creationDate,
                new Date(),
                client.status,
                client.firstName,
                client.lastName,
                client.address,
                client.birthdate
            )
            : undefined
    }

    public async getClients() {
        return clientsRepository.getClients()
    }

    public async getClientById(id: number) {
        return clientsRepository.getClientById(id)
    }
}

export default new ClientsBusinessController()