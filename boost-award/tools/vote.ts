export class Vote {
    votes: { [points: number]: string };
    email: string;
    created: string;
    url: string;

    constructor(data: any, token: string = null) {
        this.email = data.email;
        this.created = data.created;
        this.votes = data.votes || {};
        if (!!token) {
            this.url = `https://www.boostaward.de/abstimmung/?token=${token}`;
        }
    }
}