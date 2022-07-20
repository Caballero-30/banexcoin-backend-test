import clientsBusinessController from "../businessControllers/clients.businessController";
import { NextFunction, Request, Response } from "express";
import { Client } from "../models/client";
import { NotFoundException } from "../exceptions/notFoundException";

export class ClientsRouteControllers {

    public async addClient(req: Request, res: Response, next: NextFunction) {
        const client: Client = req.body
        try {
            const newClient = await clientsBusinessController.createClient(client)
            return res.json(newClient)
        }
        catch (e) { return next(e) }
    }

    public async updateClient(req: Request, res: Response, next: NextFunction) {
        try {
            const client = new Client(
                parseInt(req.params.id),
                null,
                null,
                req.body.status,
                req.body.firstName,
                req.body.lastName,
                req.body.address,
                req.body.birthdate
            )

            const updatedClient = await clientsBusinessController.editClient(client)
            if (!updatedClient) return next(new NotFoundException())

            return res.json(updatedClient)
        }
        catch (e) { return next(e) }
    }

    public async getClients(req: Request, res: Response, next: NextFunction) {
        try {
            const clients = await clientsBusinessController.getClients()
            return res.json(clients)
        }
        catch (e) { return next(e) }
    }

    public async getClient(req: Request, res: Response, next: NextFunction) {
        const clientId = parseInt(req.params.id)
        try {
            const client = await clientsBusinessController.getClientById(clientId)
            if (!client) return next(new NotFoundException())

            return res.json(client)
        }
        catch (e) { return next(e) }
    }
}