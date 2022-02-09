import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
//Addison Wessel
//Firestore learning
//FOR THIS TO WORK: must have GOOGLE_APPLICATION_CREDENTIALS envar set to path of private key json file
const app = initializeApp({ 
    credential: applicationDefault(),
    databaseURL: 'https://bloom.firebaseio.com'
});

const db = getFirestore(app);

addUsers(db);



/*
structure of song names database (tentative):

tree, roots are all chars that songs can start with, next is next char it can start with, etc.
to query some substring 'can'
*/
async function querySongNames(db) {
    
}
async function addUsers(db) {
    const docRef = db.collection('users').doc('alovelace');

    await docRef.set({
        first: 'Ada',
        last: 'Lovelace',
        born: 1815
    });

    const aTuringRef = db.collection('users').doc('aturing');

    await aTuringRef.set({
        'first': 'Alan',
        'middle': 'Mathison',
        'last': 'Turing',
        'born': 1912
    });
}