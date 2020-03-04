import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import config from '../../configs';

firebase.initializeApp(config.firebase);

export const db = firebase.firestore();

export default firebase;
