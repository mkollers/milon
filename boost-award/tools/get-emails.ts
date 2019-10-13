import { initialize } from "./initialize";
import * as admin from 'firebase-admin';
import * as _ from 'lodash';
import { Vote } from "./vote";
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'Teilnehmer.csv',
    header: [
        { id: 'email', title: 'Teilnehmer' },
        { id: 'date', title: 'Datum' }
    ],
    fieldDelimiter: ';'
});

initialize();
main();

async function main() {
    const votings = await getVotes();

    const data = [];

    console.log(`${votings.length} votes found`);
    for (let token of votings) {
        data.push({ email: token.email, date: token.created });
    }

    csvWriter
        .writeRecords(data)
        .then(() => console.log('The CSV file was written successfully'));
}

function getVotes(): Promise<Vote[]> {
    return admin.firestore()
        .collection('access_tokens')
        .get()
        .then(result => result.docs)
        .then(votes => votes.map(v => new Vote(v.data(), v.id)));
}