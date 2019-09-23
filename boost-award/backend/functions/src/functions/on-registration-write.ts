import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { connect } from 'node-mailjet';

export const OnRegistrationWrite = functions
    .region('europe-west1')
    .firestore
    .document('registrations/{email}')
    .onWrite(async (event, context) => {
        try {
            const email: string = context.params.email;
            const data = event.after.data();
            if (!data) {
                console.warn(`Registration for ${email} does not exist. Skipping function execution`);
                return;
            }
            const url = data.url;
            const token = await createAccessToken(email);
            await sendMail(email, url, token)
            // TODO: Delete previous tokens
        } catch (err) {
            console.error(err)
        }
    });

async function createAccessToken(email: string) {
    const db = admin.firestore();
    const doc = await db.collection('access_tokens').add({
        email,
        created: new Date().toUTCString()
    });
    return doc.id;
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