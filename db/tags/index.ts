import {
	doc,
	collection,
	arrayUnion,
	arrayRemove,
	setDoc,
	updateDoc,
	onSnapshot,
	DocumentData,
	QuerySnapshot,
} from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';

import { dbInstance } from '../';

import { USER_COLLECTION } from '@utils/index';

type SnapshotCallback = (snapshot: QuerySnapshot<DocumentData>) => void;

export const CreateTags = async (account: string, tag: string) => {
	try {
		await setDoc(doc(dbInstance, USER_COLLECTION, account), {
			tags: [tag],
		});

		return true;
	} catch (error) {
		console.log((error as FirebaseError).message);
		return false;
	}
};

export const AddTag = async (account: string, tag: string) => {
	try {
		const newTags = arrayUnion([tag]);
		await updateDoc(doc(dbInstance, USER_COLLECTION, account), {
			tags: newTags,
		});
	} catch (error) {
		console.log((error as FirebaseError).message);
		return false;
	}
};

export const GetTags = (cb: SnapshotCallback) => {
	onSnapshot(collection(dbInstance, USER_COLLECTION), cb);
};

export const DeleteTag = async (account: string, tag: string) => {
	try {
		const newTags = arrayRemove([tag]);
		await updateDoc(doc(dbInstance, USER_COLLECTION, account), {
			tags: newTags,
		});
	} catch (error) {
		console.log((error as FirebaseError).message);
		return false;
	}
};
