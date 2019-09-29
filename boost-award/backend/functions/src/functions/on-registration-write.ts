import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { connect } from 'node-mailjet';

export const OnRegistrationWrite = functions
    .region('europe-west1')
    .firestore
    .document('registrations/{email}')
    .onCreate(async (event, context) => {
        try {
            const email: string = context.params.email;
            const data = event.data();
            if (!data) {
                console.warn(`Registration for ${email} does not exist. Skipping function execution`);
                return;
            }
            const url = data.url;
            const token = await createAccessToken(email);
            await sendMail(email, url, token)
            await deleteRegistration(email);
        } catch (err) {
            console.error(err)
        }
    });

async function createAccessToken(email: string) {
    const db = admin.firestore();
    const now = new Date();

    let data: any = {
        email,
        created: now.toISOString(),
        createdTimestamp: admin.firestore.Timestamp.fromDate(now).seconds
    };

    // Copy data from previous token
    const snapshot = await db.collection('access_tokens').where('email', '==', email).get();
    if (!snapshot.empty) {
        if (snapshot.size > 1) {
            console.warn(`Found more than one token for ${email}`);
        }
        data = {
            ...snapshot.docs[0].data(),
            updated: now.toISOString(),
            updatedTimestamp: admin.firestore.Timestamp.fromDate(now).seconds
        };
        await db.collection('access_tokens').doc(snapshot.docs[0].id).delete();
    }
    const doc = await db.collection('access_tokens').add(data);
    return doc.id;
}

async function deleteRegistration(email: string) {
    const db = admin.firestore();
    await db.collection('registrations').doc(email).delete();
}

function sendMail(email: string, url: string, token: string) {
    const client = connect('0cf1358e7746b299927ac0d39552347b', '72643c718d5e08e32e1a4b75176248e4')
    return client
        .post('send', { 'version': 'v3.1' })
        .request({
            'Messages': [
                {
                    'From': {
                        'Email': 'bodylife@markuskollers.de',
                        'Name': 'BOOST Award'
                    },
                    'To': [
                        {
                            'Email': email,
                            'Name': email
                        }
                    ],
                    'TemplateID': 1010138,
                    'TemplateLanguage': true,
                    'Subject': 'Zugang zum BOOST Award',
                    'Variables': {
                        'url': `${url}?token=${token}`
                    }
                }
            ]
        }).then(() => console.log(`Mail successfully sent to ${email}`));
}