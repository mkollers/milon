import * as admin from 'firebase-admin';
import * as _ from 'lodash';

export function initialize() {
    let serviceAccount: any;
    let databaseUrl: string;

    serviceAccount = require('./serviceAccountKey.json');
    databaseUrl = 'milon-industries-gmbh.firebaseio.com';

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: databaseUrl
    });
}