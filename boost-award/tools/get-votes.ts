import { initialize } from "./initialize";
import * as admin from 'firebase-admin';
import * as _ from 'lodash';
import { Vote } from "./vote";
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'Einzelabstimmungen.csv',
    header: [
        { id: 'email', title: 'Teilnehmer' },
        { id: 'vote', title: 'Aufsteiger/Produktneuheit' },
        { id: 'points', title: 'Punkte' }
    ],
    fieldDelimiter: ';'
});

initialize();
main();

async function main() {
    const votings = await getVotings();
    const companies = await getCompanies();
    const products = await getProducts();

    const data = [];

    for (let token of votings) {
        for (let companyId in token.company_votes) {
            data.push({
                email: token.email,
                vote: _.find(companies, c => c.id === companyId).name,
                points: token.company_votes[companyId]
            });
        }
        for (let productId in token.product_votes) {
            data.push({
                email: token.email,
                vote: _.find(products, p => p.id === productId).name,
                points: token.product_votes[productId]
            });
        }
    }

    csvWriter
        .writeRecords(data)
        .then(() => console.log('The CSV file was written successfully'));
}

function getCompanies() {
    return admin.firestore()
        .collection('companies')
        .get()
        .then(result => result.docs)
        .then(companies => companies.map(p => ({ id: p.id, name: p.data().name })));
}

function getVotings(): Promise<Vote[]> {
    return admin.firestore()
        .collection('access_tokens')
        .get()
        .then(result => result.docs)
        .then(votes => votes.map(v => new Vote(v.data())));
}

function getProducts() {
    return admin.firestore()
        .collection('products')
        .get()
        .then(result => result.docs)
        .then(products => products.map(p => ({ id: p.id, name: p.data().name, company: p.data().company })));
}