import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBxZPRo4tv7GDpuRO6VcdQqg5hUsW_aLl0',
	authDomain: 'dhub-b5fab.firebaseapp.com',
	projectId: 'dhub-b5fab',
	storageBucket: 'dhub-b5fab.appspot.com',
	messagingSenderId: '632655706040',
	appId: '1:632655706040:web:b846d98dd5f7b5d643814d',
};

const app = initializeApp(firebaseConfig);
export const dbInstance = getFirestore(app);
