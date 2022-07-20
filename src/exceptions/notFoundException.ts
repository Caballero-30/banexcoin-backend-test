export class NotFoundException extends Error {

    readonly statusCode: number

    constructor() {
        super('Client was not found')
        this.statusCode = 404
    }
}