import moment from "moment";

export class Client {
    id: number | null
    created: Date | null
    updated: Date | null
    status: boolean
    firstName: string
    lastName: string
    address: string
    birthdate: Date

    constructor(
        id: number | null,
        created: Date | null,
        updated: Date | null,
        status: boolean,
        firstName: string,
        lastName: string,
        address: string,
        birthdate: Date
    ) {
        this.id = id;
        this.created = created;
        this.updated = updated;
        this.status = status;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.birthdate = birthdate;
    }

    toJSON() {
        return {
            id: this.id,
            created: this.created
                ? moment(new Date(this.created)).format('DD/MM/yyyy')
                : undefined,
            updated: this.updated
                ? moment(new Date(this.updated)).format('DD/MM/yyyy')
                : undefined,
            status: this.status ? 'Active' : 'Inactive',
            firstName: this.firstName,
            lastName: this.lastName,
            address: this.address,
            birthdate: moment(new Date(this.birthdate)).format('DD/MM/yyyy')
        }
    }
}