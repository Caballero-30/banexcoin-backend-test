import { Router } from "express";
import { ClientsRouteControllers } from "../routeControllers/clients.routeControllers";

const router = Router()
const clientRouteController = new ClientsRouteControllers()

router
    .post('/registro', clientRouteController.addClient)
    .get('/', clientRouteController.getClients)
    .get('/:id', clientRouteController.getClient)
    .post('/:id', clientRouteController.updateClient)

export default router