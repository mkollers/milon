import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const OnVotesWrite = functions
    .region('europe-west1')
    .firestore
    .document('access_tokens/{token}')
    .onWrite(async (event, context) => {
        try {
            const before = event.before.data() || {};
            const after = event.after.data() || {};
            // Cancel execution if no votes exist
            if (!after || !after.vote) {
                return;
            }

            await updateStatistics(before.vote, after.vote);
        } catch (err) {
            console.error(err)
        }
    });

async function updateStatistics(before: string | undefined, after: string | undefined) {
    if (before !== undefined) {
        await changeValue(before, -1);
    }
    if (after !== undefined) {
        await changeValue(after, 1);
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