import firebase from 'firebase/app';
import 'firebase/auth';

import config from '../../configs';

firebase.initializeApp(config.firebase);

export default firebase;
