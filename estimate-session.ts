export class EstimateSession {
    name: string;
    participants: string[];
    estimates: {};

    constructor(name: string) {
        this.name = name;
        this.participants = [];
        this.estimates = {};
    }
}