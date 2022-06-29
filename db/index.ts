import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
	apiKey: `${process.env.DB_KEY}`,
	authDomain: `${process.env.FIREBASE_ID}.firebaseapp.com`,
	projectId: `${process.env.FIREBASE_ID}`,
	storageBucket: `${process.env.FIREBASE_ID}.appspot.com`,
	messagingSenderId: `${process.env.FIREBASE_MSG}`,
	appId: `${process.env.FIREBASE_APP}`,
};

const app = initializeApp(firebaseConfig);
export const dbInstance = getFirestore(app);
