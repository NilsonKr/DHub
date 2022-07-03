import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
	apiKey: `${process.env.NEXT_PUBLIC_DB_KEY}`,
	authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_ID}.firebaseapp.com`,
	projectId: `${process.env.NEXT_PUBLIC_FIREBASE_ID}`,
	storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_ID}.appspot.com`,
	messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_MSG}`,
	appId: `${process.env.NEXT_PUBLIC_FIREBASE_APP}`,
};

const app = initializeApp(firebaseConfig);
export const dbInstance = getFirestore(app);
