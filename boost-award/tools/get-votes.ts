import { initialize } from "./initialize";
import * as admin from 'firebase-admin';
import * as _ from 'lodash';
import { Vote } from "./vote";
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'Abstimmungen.csv',
    header: [
        { id: 'email', title: 'Teilnehmer' },
        { id: 'firstPlace', title: '1. Platz' },
        { id: 'secondPlace', title: '2. Platz' },
        { id: 'thirdPlace', title: '3. Platz' }
    ],
    fieldDelimiter: ','
});

initialize();
main();

async function main() {
    const votings = await getVotings();
    const participants = _.keyBy(await getParticipants(), p => p.id);

    const data = [];

    for (let token of votings) {
        const first = participants[token.votes[3]];
        const second = participants[token.votes[2]];
        const third = participants[token.votes[1]];

        data.push({
            email: token.email,
            firstPlace: first ? first.name : '',
            secondPlace: second ? second.name : '',
            thirdPlace: third ? third.name : ''
        });
    }

    csvWriter
        .writeRecords(data)
        .then(() => console.log('The CSV file was written successfully'));
}

function getVotings(): Promise<Vote[]> {
    return admin.firestore()
        .collection('access_tokens')
        .get()
        .then(result => result.docs)
        .then(votes => votes.map(v => new Vote(v.data())));
}

function getParticipants(): Promise<any[]> {
    return admin.firestore()
        .collection('participants')
        .get()
        .then(result => result.docs)
        .then(participants => participants.map(p => ({ id: p.id, ...p.data() })));
}