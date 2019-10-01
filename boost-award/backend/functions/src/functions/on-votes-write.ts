import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Dictionary } from 'lodash';

export const OnVotesWrite = functions
    .region('europe-west1')
    .firestore
    .document('access_tokens/{token}')
    .onWrite(async (event, context) => {
        try {
            const before = event.before.data() || {};
            const after = event.after.data() || {};
            // Cancel execution if no votes exist
            if (!after || !after.votes) {
                return;
            }

            await updateStatistics(before.votes || {}, after.votes || {});
        } catch (err) {
            console.error(err)
        }
    });

async function updateStatistics(before: Dictionary<string>, after: Dictionary<string>) {
    for (let i = 1; i <= 3; i++) {
        if (before[i] !== after[i]) {
            if (before[i] !== undefined) {
                await changeValue(before[i], i * -1);
            }
            if (after[i] !== undefined) {
                await changeValue(after[i], i);
            }
        }
    }
}

async function changeValue(participant: string, value: number) {
    const db = admin.firestore();
    const snapshot = await db.collection('statistics').doc(participant).get();
    const data = snapshot.data() || { value: 0 };
    if (!data) {
        console.warn(`This should not happen! Participant data ${participant} not found!`);
        return;
    }

    const oldValue = data.value;
    const newValue = oldValue + value;
    await db.collection('statistics').doc(participant).set({ value: newValue });
}