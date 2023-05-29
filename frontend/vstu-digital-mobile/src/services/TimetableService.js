import firebase from "firebase/compat";
import {firebaseConfig} from "../../config";


export const getStudentTimetable = async (date, group) => {
    const app = firebase.initializeApp(firebaseConfig);
    const result = [];

    const querySnapshot = await firebase.firestore(app)
        .collection('2023first')
        .where('dates', 'array-contains', date)
        .get();

    querySnapshot.forEach((doc) => {
        if (doc.data().groups.includes(group)) {
            result.push(doc.data());
        }
    });

    return result.sort((a, b) => {
        const timeA = Number(a.time.split(':')[0]);
        const timeB = Number(b.time.split(':')[0]);
        if (timeA < timeB) { return -1; }
        else if (timeA > timeB) { return 1; }
        else { return 0; }
    });
};

export const getTeacherTimetable = async (date, name) => {
    const app = firebase.initializeApp(firebaseConfig);
    const result = [];

    console.log(date)

    const querySnapshot = await firebase.firestore(app)
        .collection('2023first')
        .where('dates', 'array-contains', date)
        .get();

    querySnapshot.forEach((doc) => {
        if (doc.data().teacher === name) {
            result.push(doc.data());
        }
    });

    return result.sort((a, b) => {
        const timeA = Number(a.time.split(':')[0]);
        const timeB = Number(b.time.split(':')[0]);
        if (timeA < timeB) { return -1; }
        else if (timeA > timeB) { return 1; }
        else { return 0; }
    });
};