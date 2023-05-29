import {
    REACT_APP_API_KEY,
    REACT_APP_AUTH_DOMAIN,
    REACT_APP_PROJECT_ID,
    REACT_APP_STORAGE_BUCKET,
    REACT_APP_MESSAGING_SENDER_ID,
    REACT_APP_APP_ID,
    REACT_APP_MEASUREMENT_ID} from "@env";

export const API_URL = 'https://f2f2-92-39-102-137.ngrok-free.app/api';
export const WS_URL = 'https://f2f2-92-39-102-137.ngrok-free.app/hub';

export const firebaseConfig = {
    apiKey: REACT_APP_API_KEY,
    authDomain: REACT_APP_AUTH_DOMAIN,
    projectId: REACT_APP_PROJECT_ID,
    storageBucket: REACT_APP_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
    appId: REACT_APP_APP_ID,
    measurementId: REACT_APP_MEASUREMENT_ID
};


export const claims = {
    group: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/groupsid',
    role: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
    id: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
}