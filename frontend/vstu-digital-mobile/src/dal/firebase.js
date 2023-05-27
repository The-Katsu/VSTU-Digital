import firebase from "firebase/compat";
import {firebaseConfig} from "../../config";


const app = firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore(app);

export const timetableDb = firestore.collection('2023first');

export const getGroups = () => timetableDb
    .doc('groups')
    .get()
    .then((doc) => {
        return doc.get('names')
    })

export class groups {
}