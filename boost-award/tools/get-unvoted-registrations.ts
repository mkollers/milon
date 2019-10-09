import { initialize } from "./initialize";
import * as admin from 'firebase-admin';
import * as _ from 'lodash';
import { Vote } from "./vote";
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'Registrierungen ohne Abstimmung.csv',
    header: [
        { id: 'email', title: 'Teilnehmer' },
        { id: 'data', title: 'Datum' },
        { id: 'url', title: 'URL' }
    ],
    fieldDelimiter: ';'
});

initialize();
main();

async function main() {
    const votings = await getVotings();

    const data = [];

    console.log(`${votings.length} votes found`);
    for (let token of votings) {
        if (!token.votes || Object.keys(token.votes).length === 0) {
            data.push({ email: token.email, data: token.created, url: token.url });
        }
    }
    console.log(`${data.length} participants without votes found`);

    csvWriter
        .writeRecords(data)
        .then(() => console.log('The CSV file was written successfully'));
}

function getVotings(): Promise<Vote[]> {
    return admin.firestore()
        .collection('access_tokens')
        .get()
        .then(result => result.docs)
        .then(votes => votes.map(v => new Vote(v.data(), v.id)));
}