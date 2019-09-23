export interface Token {
    key: string;
    created: string;
    updated?: string;
    email: string;
    votes: { [id: string]: number };
}
